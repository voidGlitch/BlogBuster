import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/posts.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
//We need to use this before routes as we dont get any proxy errors from the cors
app.use(cors());

app.use("/posts", router);

//Step 1 Created a cluster database using Mongodb Atlas
// const CONNECTIONURL =
//   "mongodb+srv://voidGlitch:voidGlitch123@cluster0.8lsei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Mongoose Has been Connected Successfully & Server is running on port ${PORT} `
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
//Makes us sure we dont get any other warning
mongoose.set("useFindAndModify", false);
