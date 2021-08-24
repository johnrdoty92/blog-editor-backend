import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import articleRouter from "./routes/routes.js";

const server = express();
const PORT = process.env.PORT || 3001;

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//===============================================
//                    ROUTES
//===============================================
server.use("/articles", articleRouter);

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
  console.log("connected to database");
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
