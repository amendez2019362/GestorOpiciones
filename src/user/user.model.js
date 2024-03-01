import mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "The name is mandatory"]
    },

    email: {
        type: String,
        required: [true, "The email is mandatory"]
    },
    password: {
        type: String,
        require: [true, "The password is mandatory"]
    },
    status: {
        type: Boolean,
        default: true
    }
});

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, status, ...user} = this.toObject();
    user.uid = _id;
    return user
}

export default mongoose.model('User', UserSchema);