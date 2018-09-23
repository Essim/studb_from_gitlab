/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import { commentSchema } from './commentSchema';
import { opinionSchema } from './opinionSchema';
import Tag from './tagSchema';
import Division from './divisionSchema';
import cuid from 'cuid';


export const documentSchema = mongoose.Schema();

documentSchema.add({
    cuid_division: String,
    cuid_course: String,
    name: String,
    cuid_author: String,
    name_author: String,
    description: String,
    date: Date,
    path: String,
    isRep: Boolean,
    multiplePath: Boolean,
    files: mongoose.Schema.Types.Mixed,
    parent_version: String,
    mainVersion: String,
    revisionNumber: { type: Number, default: 0 },
    opinions: [opinionSchema],
    comments: [commentSchema],
    tags: [{ type: Number, ref: 'Tag' }],
    logicalDelete: Boolean,
    cuid: { type: 'String', required: true },
});

const autoPopulateTags = function (next) {
    this.populate('tags');

    next();
};

documentSchema
    .pre('findOne', autoPopulateTags)
    .pre('find', autoPopulateTags);


documentSchema.methods.registerTags = function (tags) {
    return Promise.all(tags.map(tag => {
        if (tag === parseInt(tag, 10)) {
            return Tag.findOne({ _id: tag }).exec((err,data) => {
                if (err || !data) {
                    throw new Error("Unable to find tag n°" + tag);
                }
                this.tags.push(data);
            });
        } else {
            return Tag.createIfNonExists(tag).then((tag) => {
                this.tags.push(tag);
            });
        }
    }));
};

documentSchema.methods.registerFile = function (file) {
    let path = file.path.substr("files/".length + this.cuid.length + 1);
    let index, current;

    if (!this.files) {
        this.files = {
            _contents: [],
        };
    }
    current = this.files;
    while ((index = path.indexOf('/')) !== -1) {
        const prefix = path.substr(0, index).replace(".", "&#46;");
        path = path.substr(index + 1);

        if (!current[prefix]) {
            current[prefix] = {
                _contents : [],
            }
        }
        current = current[prefix];
    }
    current._contents.push({
        name: path,
        path: file.path.substr("files/".length),
        type: file.type
    });
};

documentSchema.methods.addOpinion = function (userId, o) {
    if (this.opinions.some(opinion => opinion.cuid_author === userId && o.report === opinion.report)) {
        console.log("Opinion already exists !");
        return;
    }
    o.cuid = cuid();
    o.logicalDelete = false;
    o.date = new Date();
    this.opinions.push(o);
    return this;
};

documentSchema.methods.removeRecursive = () => {
    this.logicalDelete = true;
    this.opinions.forEach((opinion) => {
        opinion.methods.removeRecursive();
    });
    this.comments.forEach((comment) => {
        comment.methods.removeRecursive();
    });
};


/**
 * Before saving
 * map * a revision to a root file from parent
 *     * set a new document file based on this.cuid
 */
documentSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();

        return;
    }

    if (!this.parent_version) {
        console.log("Raw new file");
        this.mainVersion = this.cuid;
        this.parent_version = "";
        this.revisionNumber = 0;

        next();

        return;
    }

    console.log("Validating revision file from " + this.parent_version);
    Document.findOne({ cuid : this.parent_version }, (err, document) => {
        console.log("Err : ", err);
        // console.log("Document : " + document);
        if (err || !document) {
            throw Error("Parent file can't be identified" + (err ? "(" + err + ")" : ""));
        } else {
            Document.findOne({ mainVersion : document.mainVersion }, null, { sort: { date : -1 } }, (err, document) => {
                console.log("Real parent doc : " + document.cuid);
                if (document.cuid !== this.parent_version) {
                    console.log("Conflict between version, rewrite 'parent_version' to keep linear");
                }

                this.mainVersion = document.mainVersion;
                this.revisionNumber = document.revisionNumber + 1;
                this.parent_version = document.cuid;

                next();
            });
        }
    });
});

/**
 * append tags from course
 */
documentSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }

    if (!this.cuid_division || !this.cuid_course) {
        next(new Error("Document "+ this.name + " requires a valid " + (!this.cuid_division ? "division" :  "course")));

        return;
    }


    Division.findOne({ "cuid" : this.cuid_division, "courses.cuid" : this.cuid_course }, {'courses.$': 1} , (err, division) => {
        if (err) {
            throw Error("Document division " + this.cuid_division + " file can't be identified" + (err ? "(" + err + ")" : ""));
        }

        if (!division || !division.courses[0]) {
            next(new Error("Document "+ this.name + " requires a valid " + (this.cuid_division ? "division" :  "course")));

            return;
        }

        this.tags.unshift(division.courses[0].tagId);
        this.tags.unshift(division.courses[0].gradeTagId);

        next();
    })
});


const Document = mongoose.model('Document', documentSchema);


export default Document;
