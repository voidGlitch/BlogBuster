import PostMessage from "../modals/postMessage.js";
import mongoose from "mongoose";

// Defines all the function need to run on the routes
export const getPosts = async (req, res) => {
  try {
    //Function to find all the posts we have created
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404, { message: error.message });
  }
};

export const createPost = async (req, res) => {
  //Request the body from the client side(Frontend)
  const post = req.body;
  //body should be according to the schema defined by Mongoose
  const newPost = new PostMessage(post);
  try {
    //ASYNCHRONOUS FUNTION need to be await
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(404, { message: error.message });
  }
};

export const updatePost = async (req, res) => {
  //params property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /student/:id, then the “id” property is available as req.params.id.
  const { id: _id } = req.params;
  const post = req.body;
  // To Check the _id that it is mongoose id
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this Id");

  //Hold our modal and Find&update by given updated post data
  //Now we do get the post data which has {title,message,selectedFile,etc} but it doesn't contain id so
  const updatePost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.status(200).json(updatePost);
};

//Delete Post
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this Id");

  await PostMessage.findByIdAndDelete(_id);

  res.json({ message: "Post has been Deleted Successfully" });
};

//Like Post
export const likePost = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this Id");

  //Firstly We are going to find that particular post
  const post = await PostMessage.findById(_id);

  //Then update the post by taking that particular post then Adding a like in it
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    {
      likeCount: post.likeCount + 1,
    },
    { new: true }
  );
  res.json(updatedPost);
};
