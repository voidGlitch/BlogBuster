import { AppBar, Container, Grid, Grow, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Form from "./components/form/Form";
import Posts from "./components/posts/Posts";
import memories from "./Images/memories.png";
import useStyles from "./Styles";
import { getPosts } from "./actions/posts";
//Helps us to dispatch our action
import { useDispatch } from "react-redux";
//useSelector is a function that takes the current state as an argument and returns whatever data you want from it and it allows you to store the return values inside a variable within the scope of you functional components instead of passing down as props.
import { useSelector } from "react-redux";

const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  //Define dispatch
  const dispatch = useDispatch();
  //define useSelectors
  const posts = useSelector((state) => state.posts);

  console.log(posts);
  //Now As we want our dispact to mount manually we use useEffect
  useEffect(() => {
    //Dispatch Takes a Function to call
    dispatch(getPosts());
    //when currentId is changing after we change the post we get fresh posts
  }, [dispatch, currentId]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.mainContainer}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid
              style={{
                maxWidth: "100%",
              }}
              item
              xs={7}
              sm={3}
            >
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
