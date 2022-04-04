import { AppBar, Container, Grid, Grow, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import Form from "./components/form/Form";
import Posts from "./components/posts/Posts";
import memories from "./Images/memories.png";
import useStyles from "./Styles";
import { getPosts } from "./actions/posts";
//Helps us to dispatch our action
import { useDispatch } from "react-redux";

const App = () => {
  const classes = useStyles();
  //Define dispatch
  const dispatch = useDispatch();

  //Now As we want our dispact to mount manually we use useEffect
  useEffect(() => {
    //Dispatch Takes a Function to call
    dispatch(getPosts());
  }, [dispatch]);

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
            spacing={4}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid xs={7} sm={3}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
