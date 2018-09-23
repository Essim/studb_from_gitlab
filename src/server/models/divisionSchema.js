import mongoose from 'mongoose';
import Tag from './tagSchema';
import { courseSchema } from './courseSchema';

export const divisionSchema = mongoose.Schema();

divisionSchema.add({
    name: String,
    acronym: String,
    courses: [courseSchema],
    logicalDelete: Boolean,
    tagId: Number,
    cuid: { type: 'String', required: true },
});

divisionSchema.virtual('course').set((o) => {
    this.courses += o;
}).get(() => this.courses);


divisionSchema.methods.removeRecursive = () => {
    this.logicalDelete = true;
    this.courses.forEach((course) => {
        course.methods.removeRecursive();
    });
};

divisionSchema.methods.registerCourse = function(course) {
    return Tag.createIfNonExists(course.grade + this.acronym, true)
        .then((tag) => {
            course.gradeTagId = tag._id;
        })
        .then(() => {
            return Tag.createIfNonExists(course.name, false, true)
        })
        .then((tag) => {
            course.tagId = tag._id;
        }).then(() => {
            this.courses.push(course);
        });
};

divisionSchema.pre('save', function (next) {
    Tag.createIfNonExists(this.acronym, true).then(tag => {
        this.tagId = tag._id;
    }).then(() => {
        Promise.all(
            this.courses
                .map(course => course.name)
                .filter((name, index, self) => {
                    return self.indexOf(name) === index;
                }).map((name) => {
                    return Tag.createIfNonExists(name, false, true)
                }).concat([1,2,3].map((number) => {
                    return Tag.createIfNonExists(number + this.acronym, true)
                })
            )
        ).then((tags) => {
            this.courses = this.courses.map(course => {
                course.tagId = tags.find(tag => tag.name === course.name && !tag.division)._id;
                course.gradeTagId = tags.find(tag => tag.division && tag.name === course.grade + this.acronym);

                return course;
            });
            next();
        });
    });
});


export default mongoose.model('Division', divisionSchema);
