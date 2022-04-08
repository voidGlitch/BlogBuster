import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useStyles from "./Styles";
// React Component for Converting Files to base64
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";

const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyles();
  const [postData, setpostData] = useState({
    creator: "",
    Title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  //For updating post we first need to particular post from the array of posts from reducers
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (post) setpostData(post);
  }, [post]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postData);
    //If we have the access to currentid we are going to update the Post by giving it the id and updated Data else creating it
    if (currentId) {
      dispatch(updatePost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }
  };
  const clear = () => {};
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Creating a Blog</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          onChange={(e) =>
            setpostData({ ...postData, creator: e.target.value })
          }
          value={postData.creator}
        />
        <TextField
          name="Title"
          variant="outlined"
          label="Title"
          fullWidth
          onChange={(e) => setpostData({ ...postData, Title: e.target.value })}
          value={postData.Title || ""}
        />
        <TextField
          name="message"
          variant="outlined"
          label="message"
          fullWidth
          onChange={(e) =>
            setpostData({ ...postData, message: e.target.value })
          }
          value={postData.message}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          onChange={(e) => setpostData({ ...postData, tags: e.target.value })}
          value={postData.tags}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setpostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          onClick={clear}
          size="large"
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
