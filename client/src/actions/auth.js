import { AUTH } from "../constants/actionTypes";
import * as api from "../api/index.js";

//Action creators if are asynchronous then we need to use redux thunk meaning we have a function that return a async function with a dispatch syntax is given below
export const signin = (fromData, navigate) => async (dispatch) => {
  try {
    // Log in the user
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const signup = (fromData, navigate) => async (dispatch) => {
  try {
    // signUP  the user
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
