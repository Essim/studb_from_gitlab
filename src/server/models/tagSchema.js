import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import sanitizeHtml from 'sanitize-html';
import cuid from "cuid";

export const tagSchema = mongoose.Schema();

autoIncrement.initialize(mongoose.connection);

tagSchema.add({
    name: String,
    division: Boolean,
    course: Boolean,
    logicalDelete: Boolean,
    numid: Number,
    cuid: { type: 'String', required: true },
});

tagSchema.plugin(autoIncrement.plugin, {
    model: 'Tag',
    // field: 'numid',
    startAt: 1,
});

tagSchema.methods.removeRecursive = () => {
    this.logicalDelete = true;
};

tagSchema.statics.createIfNonExists = (tag, division = false, course = false) => {
    const innerTag = tag;

    return new Promise((resolve) => {
        Tag.findOne({ name : innerTag }, (err, data) => {
            if (err || !data) {
                const tag = new Tag({
                    name: sanitizeHtml(innerTag),
                    division,
                    course,
                    logicalDelete: false,
                    cuid: cuid(),
                });

                tag.save((err) => {
                    if (err)
                        throw Error("Tag " + tag.name + " not saved");

                    // console.log("Tag saved : " + innerTag + ":" + tag._id);
                    resolve(tag);
                })
            } else {
                // console.log("Existing tag : " + innerTag + ":" + data._id);
                resolve(data);
            }
        })
    });
};

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
