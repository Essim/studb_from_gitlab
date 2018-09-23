import mongoose from 'mongoose';

export const opinionSchema = mongoose.Schema();

opinionSchema.add({
    cuid_author: String,
    name_author: String,
    date: Date,
    state: Boolean,
    report: Boolean,
    logicalDelete: Boolean,
    cuid: { type: 'String', required: true },
});

opinionSchema.methods.removeRecursive = () => {
    this.logicalDelete = true;
};


export default mongoose.model('Opinion', opinionSchema);
