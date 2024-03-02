import mongoose, { Schema } from "mongoose";

const publicationSchema = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        require: [true, "Required field"]
    },
    category:{
        type: String,
        require: [true, "Required field"]
    },
    mainText:{
        type: String,
        require: [true, "Required field"]
    },
    status:{
        type: Boolean,
        default: true
    }
});
publicationSchema.methods.toJSON = function() {
    const { __v, _id, status, ...publication} = this.toObject();
    publication.uid = _id;
    return publication;
};

export default mongoose.model('Publication', publicationSchema);