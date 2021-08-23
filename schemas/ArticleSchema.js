import mongoose from "mongoose";

//Fields: content, date, tags, image?, description, title, author?,
//To add your own methods, set one with ArticleSchema.methods.<newMethodName> = define function (w/o arrow function)
//Find articles by using find() on the model
const ArticleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now, required: true },
    HTMLcontent: { type: String, required: true },
    tags: [String],
  },
  { collection: "testArticles" } //Change collection here before actual use
);

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
