import mongoose from 'mongoose';
import { opinionSchema } from './opinionSchema';

export const commentSchema = mongoose.Schema();

commentSchema.add({
    cuid_author: String,
    name_author: String,
    text: String,
    date: Date,
    mainComment: Boolean,
    logicalDelete: Boolean,
    comments: [commentSchema],
    opinions: [opinionSchema],
    cuid: { type: 'String', required: true },
});

commentSchema.virtual('author').set((a) => {
    this.id_author = a.cuid;
    this.name_author = a.name;
}).get(() => `${this.id_author} ${this.name_author}`);

commentSchema.virtual('opinion').set((o) => {
    this.opinions += o;
}).get(() => this.opinions);

commentSchema.methods.addComment = ((userId, c) => {
    if (!this.comments.findOne({ id_author: userId })) {
        this.comments += c;
    }
});

commentSchema.methods.removeRecursive = () => {
    this.logicalDelete = true;
    this.opinions.forEach((opinion) => {
        opinion.methods.removeRecursive();
    });
    this.comments.forEach((comment) => {
        comment.methods.removeRecursive();
    });
};

commentSchema.virtual('isDeleted').set((d) => {
    this.logicalDelete = d;
}).get(() => this.logicalDelete);


export default mongoose.model('Comment', commentSchema);