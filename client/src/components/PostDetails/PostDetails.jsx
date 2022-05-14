import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
//useSelector hook is used to get the state from the redux store
import { useSelector } from "react-redux";
import Post from "../posts/post/Post";
import useStyles from "./Styles";

const PostDetails = ({ setCurrentId }) => {
  //The State which we are using currently is the posts array
  const posts = useSelector((state) => state.posts);
  console.log({ posts });
  const classes = useStyles();
  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid
      className={classes.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {/* This is map method which will map inside every item inside the post array */}
      {posts.map((post) => {
        return (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PostDetails;
