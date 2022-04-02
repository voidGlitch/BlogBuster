import PostMessage from "../modals/postMessage";

// Defines all the function need to run on the routes

export const getPosts = async(req, res) => {
 try {
  //Function to find all the posts we have created
  const postMessages = await PostMessage.find()
  res.status(200).json(postMessages)
 } catch (error) {
  res.status(404, { message: error.message });
 }
};

export const createPost = (req, res) => {
 //Request the body from the client side(Frontend)
 const post = req.body;
 //body should be according to the schema defined by Mongoose
 const newPost = new PostMessage(post);
 try {
  //ASYNCHRONOUS FUNTION need to be await
  await newPost.save()
   res.status(200).json(newPost);
 } catch (error) {
   res.status(404, { message: error.message });
 }
};
