import { Container } from "@material-ui/core";
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//useSelector is a function that takes the current state as an argument and returns whatever data you want from it and it allows you to store the return values inside a variable within the scope of you functional components instead of passing down as props.
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { getPosts } from "./actions/posts";

const App = () => {
  // //define useSelectors
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  console.log(posts);

  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
