import PostMessage from "../modals/postMessage.js";
import mongoose from "mongoose";
import express from "express";

const router = express.Router();
// Defines all the function need to run on the routes
export const getPosts = async (req, res) => {
  //Getting the Page Query from the endpoint query
  const { page } = req.query;

  try {
    const LIMIT = 4;
    //Start index of a post on a specific page
    const startIndex = (Number(page) - 1) * LIMIT; //Get the starting index of every page
    //TO know what is the last page we can scroll to
    const total = await PostMessage.countDocuments({});
    //Function to find all the posts we have created
    const posts = await PostMessage.find()
      .sort({ _id: -1 }) //Newest to oldest
      .limit(LIMIT) //8 PAGE limit
      .skip(startIndex); //Skip all the prev pages
    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberofPages: Math.ceil(total / LIMIT), //Total no. of pages
    });
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

//Query -> /posts?page=1 -> page =1
//Params -> /posts/123 -> id=123

//Gets posts by search
export const getPostsBySearch = async (req, res) => {
  //Getting data from the Query
  const { searchQuery, tags } = req.query;
  try {
    //The RegExp object is used for matching text with a pattern.The i Stand for ignore case
    //Test TEST test its all same
    const Title = new RegExp(searchQuery, "i");
    //Find me all the post match with one of these ("or") i.e equal to title or Tags ("in") the array of tags equal to our tag
    const posts = await PostMessage.find({
      $or: [{ Title: Title }, { tags: { $in: tags.split(",") } }],
    });

    //Sending the results back to frontend
    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Comment Post functionality

export const commentPost = async (req, res) => {
  //Id comes from api request
  const { id } = req.params;
  //passing an object containing value
  const { value } = req.body;

  //Getting post from database
  const post = await PostMessage.findById(id);
  //Adding comments in that post
  post.comments.push(value);
  //And then updating the database so that new post contain the comments and storing the value in the updatePost variable
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.json(updatedPost);
};

export default router;
