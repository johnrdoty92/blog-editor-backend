import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Article from "./schemas/ArticleSchema.js";
import router from "./routes/routes.js";

const server = express();
const PORT = process.env.PORT || 3001;

//Allow for body parsing
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//Routes
server.use("/api", router);

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

// =======================================POST request=============================================
// server.post("/", async (req, res) => {
//   console.log("POST request made");
//   try {
//     //Fix this to look like the new schema
//     const newArticle = await new Article({
//       _id: new mongoose.Types.ObjectId(),
//       content: req.body.content,
//     });
//     console.log(newArticle);
//     if (req.body.content) {
//       await newArticle.save((err, article) => {
//         if (err) return console.log("There was an error:" + err);
//         console.log(article);
//       });
//       console.log("Success: " + newArticle.content);
//     }
//   } catch (e) {
//     console.log("Failed: " + e.message);
//   }
// });

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
