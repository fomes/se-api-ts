import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const port = process.env.PORT || 3333;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log("Online...");
});
