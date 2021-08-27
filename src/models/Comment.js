import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  videos: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: "Video",
  },
  owner: { type: mongoose.Schema.Types.ObjectID, required: true, ref: "User" },
  createdAt: { type: Date, default: Date.now, required: true },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
