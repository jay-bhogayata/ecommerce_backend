import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { login, signUp } from "./controllers/auth.controllers.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from backend...");
});

app.post("/signup", signUp);
app.post("/login", login);

export default app;
