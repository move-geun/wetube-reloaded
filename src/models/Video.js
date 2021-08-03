import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 1, trim: true },
  description: { type: String, required: true, minLength: 1, trim: true },
  createdAt: { type: Date, default: Date.now, required: true },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0, required: true },
    rating: { type: Number, default: 0, required: true },
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;

///////