import mongoose from "mongoose";

//Defines the Schema and modals for our app
const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFiles: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Number,
    default: new Date(),
  },
});
//Creates a model of above Defined Schema
const PostMessage = mongoose.model("postMessage", postSchema);

export default PostMessage;
