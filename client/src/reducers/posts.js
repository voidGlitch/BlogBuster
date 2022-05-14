//So reducer is a function that accepts the state and action and then based on the action type it perform the logic inside the action.type
/*more specifically return the action or the state changed by the action */
import {
  FETCH_ALL,
  UPDATE,
  DELETE,
  LIKE,
  CREATE,
  FETCH_BY_SEARCH,
} from "../constants/actionTypes";
/*🤔As we are dealing with Posts data so we rename state as posts for now */
export default (posts = [], action) => {
  //State should always be equal to something we can set it as nothing or null
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case FETCH_BY_SEARCH:
      return action.payload;

    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case LIKE:
      //Going to map inside the post to check if the currently selected post id is matched with updated post id
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    case CREATE:
      //Gonna return the post previously on the array and then the new Post
      return [...posts, action.payload];

    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};
