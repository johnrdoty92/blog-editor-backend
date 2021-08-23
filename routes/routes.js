import { postNewArticle, getRequest } from "./../controllers/controllers.js";
import express from "express";

const router = express.Router();

router.get("/", getRequest);
router.post("/", postNewArticle);

export default router;
