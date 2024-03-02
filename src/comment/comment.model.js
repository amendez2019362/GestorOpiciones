import mongoose, { Schema } from "mongoose";

const commentSchema = mongoose.Schema({
    publicationId: {
        type: Schema.Types.ObjectId,
        ref: 'Publication'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    commentTitle: {
        type: String,
        require: [true, "Required field"]
    },
    commentContent: {
        type: String,
        require: [true, "Required field"]
    },
    status: {
        type: Boolean,
        default: true
    }
})

CommentSchema.methods.toJSON = function () {
    const { __v, _id, status, ...comment } = this.toObject();
    comment.uid = _id;
    return comment
}

export default mongoose.model('Comment', commentSchema);