import mongoose from "mongoose";

//Defines the Schema and modals for our app~
const postSchema = mongoose.Schema({
  Title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Number,
    default: new Date(),
  },
});
//Creates a model of above Defined Schema
var PostMessage = mongoose.model("postMessage", postSchema);

export default PostMessage;
