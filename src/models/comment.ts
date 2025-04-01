import mongoose, {Schema, Types, Document} from "mongoose";

const commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activity: {
        type: Schema.Types.ObjectId,
        ref: 'Activity', // Referència a l'activitat comentada
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1, // Optional: Minimum length
        maxlength: 500, // Optional: Maximum length
        index: true // Optional: Index for faster searches
    },
    isEdited: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); // timestamps para createdAt y updatedAt


export interface IComment extends Document {
    _id: Types.ObjectId;
    author: Types.ObjectId;
    activity: Types.ObjectId;
    content: string;
    isEdited: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CommentModel = mongoose.model('Comment', commentSchema);
export default CommentModel;
