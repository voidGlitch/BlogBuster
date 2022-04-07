import PostMessage from "../modals/postMessage.js";

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

  if (mongoose.Type.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with this Id");
  }
  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });
  res.json(updatePost);
};
