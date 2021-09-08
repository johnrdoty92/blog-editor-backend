import Article from "../schemas/ArticleSchema.js";

/*==============================================================
                          GET REQUESTS
================================================================ */
export const getArticles = async (req, res) => {
  console.log("GET request made for all articles");
  try {
    const articles = await Article.find().sort({ date: -1 });
    if (articles.length == 0) {
      res.status(404);
      res.json({ title: "Not found", message: "No articles were found" });
      return;
    }
    res.status(200);
    res.json(articles);
  } catch (error) {
    res.status(400).json({ title: error.name, message: error.message });
  }
};
/*==============================================================
                          POST REQUESTS
================================================================ */
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
    res.status(201).json({
      title: "Uploaded Article",
      message: `Successfully uploaded article "${savedArticle.title}"!`,
    });
  } catch (error) {
    res.status(400).json({ title: error.name, message: error.message });
  }
};
/*==============================================================
                          DELETE REQUESTS
================================================================ */
export const deleteArticle = (req, res) => {
  console.log("DELETE request made");
  try {
    Article.findByIdAndDelete(req.params.id, (err, deleted) => {
      if (err) {
        res.status(400);
        res.json({ title: err.name, message: err.message });
        return;
      }
      if (!deleted) {
        res.status(400);
        res.json({
          title: "Bad Request",
          message:
            "The article you are trying to delete does not exist or has already been deleted",
        });
      }
      res.json({
        title: "Deleted Article",
        message: `Article "${deleted?.title}" was removed from the database`,
      });
    });
  } catch (error) {
    res.status(400).json({ title: error.name, message: error.message });
  }
};
/*==============================================================
                          PATCH REQUESTS
================================================================ */
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
    if (updatedArticle === null) {
      throw new Error(
        "Article could not be updated. Please refresh or ensure that the database is connected."
      );
    }
    res.status(200).json({
      title: "Updated Article",
      message: `Successfully saved changes to article "${updatedArticle.title}"!`,
    });
  } catch (error) {
    res.status(400).json({ title: error.name, message: error.message });
  }
};
