import Article from "../schemas/ArticleSchema.js";

export const getArticles = async (req, res) => {
  console.log("GET request made");
  try {
    const articles = await Article.find();
    if (articles.length == 0) {
      res.status(404);
      res.send("No articles were found");
      return;
    }
    res.status(200);
    res.json(articles);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const postNewArticle = async (req, res) => {
  console.log("POST request made");
  try {
    const newArticle = await new Article({
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      date: Date.now(),
      HTMLcontent: req.body.HTMLcontent,
      tags: req.body.tags,
    });
    const savedArticle = await newArticle.save();
    res.status(200).json(savedArticle);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const deleteArticle = async (req, res) => {
  console.log("DELETE request made");
  try {
    Article.findByIdAndDelete(req.params.id, (err, deleted) => {
      if (err) {
        res.status(400);
        res.send(err);
        return;
      }
      if (!deleted) {
        res.status(400);
        res.send(`Cannot find article with id of ${req.params.id}`);
        return;
      }
      res.send("Deleted: " + deleted?.title);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export const updateArticle = async (req, res) => {
  console.log("PATCH request made");
  try {
    const updatedArticle = await Article.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        useFindAndModify: false,
        new: true,
      }
    );
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
