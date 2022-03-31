import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("It Works");
});

export default router;
