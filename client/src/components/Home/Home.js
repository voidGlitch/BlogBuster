import { Container, Grid, Grow } from "@material-ui/core";
import React, { useEffect, useState } from "react";
//Helps us to dispatch our action
import { useDispatch } from "react-redux";
import Form from "../form/Form";
import Posts from "../posts/Posts";
import { getPosts } from "../../actions/posts";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  //Define dispatch
  const dispatch = useDispatch();

  //Now As we want our dispact to mount manually we use useEffect
  useEffect(() => {
    //Dispatch Takes a Function to call
    dispatch(getPosts());
    //when currentId is changing after we change the post we get fresh posts
  }, [dispatch, currentId]);

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
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
  );
};

export default Home;
