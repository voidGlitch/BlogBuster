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
  // title, message, selectedFile, creator, tags
  const post = req.body;

  //body should be according to the schema defined by Mongoose
  const newPostMessage = new PostMessage({
    ...post,
    //Backend will now doesn't need creator feild as the logged in user is creator of the post
    creator: req.userId,
    //Value to show the date when it was created
    createdAt: new Date().toISOString(),
  });
  try {
    await newPostMessage.save();
    //ASYNCHRONOUS FUNTION need to be await
    res.status(200).json(newPostMessage);
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
  //Logic to auth every single user to like the post only once
  if (!req.userId) {
    res.json({ message: "You are not authenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with this Id");

  //Firstly We are going to find that particular post
  const post = await PostMessage.findById(_id);

  //Logic to auth every single user to like the post only once
  const index = post.likes.findIndex((id) => id === String(req.userId)); //Finding the userId in the like section if already liked then operation doesn't perform

  //Only if the userId is not in the like Section
  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  //Then update the post by taking that particular post then Adding a like in it
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};
