export const postNewArticle = (req, res) => {
  console.log("POST request made");
  res.send("POST REQUEST MADE");
  res.end();
};

export const getRequest = (req, res) => {
  console.log("GET request made");
};
