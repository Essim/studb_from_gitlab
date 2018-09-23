import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

export const userSchema = mongoose.Schema();

export const USER_ROLE = 1;
export const TEACHER_ROLE = 2;
export const ADMIN_ROLE = 3;

userSchema.add({
    name: { type: String, unique: true },
    token: { type: String, unique: true },
    email: { type: String, unique: true },
    followed_courses: [String],
    password: String,
    date_creation: Date,
    date_connection: Date,
    group: [Number],
    role: Number,
    cuid_division: String,
    logicalDelete: Boolean,
    cuid: { type: 'String', required: true },
});

// to be used in passport.js
userSchema.methods.comparePassword = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err)
            return callback(err);
        callback(null, isMatch);
    // ESlint wanted a return
    return true;
    });
};

userSchema.methods.removeRecursive = () => {
    this.logicalDelete = true;
};


export default mongoose.model('User', userSchema);
