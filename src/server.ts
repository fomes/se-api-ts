import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { helloRouter } from "./routes/hello";
import { postUserRouter } from "./routes/postUsers";
import { postLoginRouter } from "./routes/postLogin";

const port = process.env.PORT || 3333;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log("Online...");
});

app.use(helloRouter);
app.use(postUserRouter);
app.use(postLoginRouter);
