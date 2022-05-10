import * as api from "../api";
import {
  FETCH_ALL,
  UPDATE,
  DELETE,
  LIKE,
  CREATE,
} from "../constants/actionTypes";

//Action creators are function that return function
export const getPosts = () => async (dispatch) => {
  try {
    //Fetch all the data from the api we destructure it as it return the response to the data
    const { data } = await api.fetchPosts();
    const action = { type: FETCH_ALL, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
  // return action instead of returning the action we need to do just dispatch the action in redux-thunk
};

//Creating action for getting post on search
export const getPostsbySearch = (SearchQuery) => async (dispatch) => {
  try {
    //We need to destructure data 2 time as first time it is by axios request and second time as we store the data in an new object with data property
    const { data } = await api.fetchPostsBySearch(SearchQuery);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

/*As we are dealing with ASYNCRONOUS function we need to await and for that we use thunk allows us in here an additional arrow function*/
export const createPost = (post) => async (dispatch) => {
  try {
    //As create posts function wants somedata to work on and then send it to the server
    const { data } = await api.createPosts(post);
    const action = { type: CREATE, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error.message);
  }
};

//Update Post Function
export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

//Delete Post Function
export const deletePost = (id) => async (dispatch) => {
  try {
    //We dont need response of this as we are delete the data which is not existing anyways
    await api.deletePost(id);

    //Payload as id because we want to delete it
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

//Like post Function
export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
