import mongoose from 'mongoose';


export const courseSchema = mongoose.Schema();

courseSchema.add({
    name: String,
    grade: Number,
    logicalDelete: Boolean,
    cuid: { type: 'String', required: true },
    tagId: Number,
    gradeTagId: Number,
});

courseSchema.methods.removeRecursive = () => {
    this.logicalDelete = true;
};

export default mongoose.model('Course', courseSchema);
