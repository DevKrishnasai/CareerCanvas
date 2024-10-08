import express from "express";
import dotenv from "dotenv";
import { db } from "./utils/db";
import { User } from "@careeraft/database";
import logger from "@careeraft/logger";

dotenv.config();

const app = express();

app.get("/users", async (req, res) => {
  const users: User[] = await db.user.findMany();
  res.json(users);
});

app.get("/", (req, res) => {
  logger.info("Hello World");
  res.json({ message: "working" });
});

app.listen(process.env.PORT, () => {
  if (!process.env.PORT) {
    throw new Error("env not loaded");
  }
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
