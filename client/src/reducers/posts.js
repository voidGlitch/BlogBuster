//So reducer is a function that accepts the state and action and then based on the action type it perform the logic inside the action.type
/*more specifically return the action or the state changed by the action */

/*🤔As we are dealing with Posts data so we rename state as posts for now */
export default (posts = [], action) => {
  //State should always be equal to something we can set it as nothing or null
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;

    case "CREATE":
      return posts;

    default:
      return posts;
  }
};
