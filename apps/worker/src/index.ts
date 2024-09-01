import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "worker working" });
});

app.listen(process.env.PORT, () => {
  if (!process.env.PORT) {
    throw new Error("env not loaded");
  }
  console.log(`worker is running on http://localhost:${process.env.PORT}`);
});
