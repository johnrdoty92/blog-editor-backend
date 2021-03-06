import { postNewArticle, getArticles, updateArticle, deleteArticle } from "../controllers/articles.js";
import express from "express";

const articleRouter = express.Router();

articleRouter.post("/", postNewArticle);
articleRouter.get("/", getArticles);
articleRouter.patch("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);

export default articleRouter;
