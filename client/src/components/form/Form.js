import { Button, Paper, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import useStyles from "./Styles";
// React Component for Converting Files to base64
import FileBase from "react-file-base64";
const Form = () => {
  const classes = useStyles();
  const [postData, setpostData] = useState({
    creator: "",
    Title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const handleSubmit = () => {};
  const clear = () => {};
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
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
          value={postData.Title}
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
            onDone={({ base64 }) => {
              setpostData({ ...postData, selectedFile: base64 });
            }}
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
          variant="contained"
          color="secondary"
          onClick={clear}
          size="small"
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
