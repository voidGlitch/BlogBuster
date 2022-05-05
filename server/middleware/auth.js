import jwt, { decode } from "jsonwebtoken";

//Wants to like a post
//Click the like button => auth middleware(NEXT) => likes the post....

//Next is for do something and then move to the next thing
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //If length of the token is less than 500 then it is our own generated token if not then it is of google
    const isCustomAuth = token.length < 500;

    let decodedData;
    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      //Sub is google name for specific id that diff every single google user
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
