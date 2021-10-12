# Blog Editor Server

This is the backend code to a blog article content editor. It makes use of the Jodit Editor to edit rich text and save it to a database with MongoDB. A working, full-stack version of this project can be found [**HERE**](http://johndoty.website).

This API responds to CRUD requests. To get it working, clone the repository, change the `sample.env` file to a regular `.env` file, and fill out the MongoDB url and port number.

Use the following commands to start the server:
- `npm run devStart` (This will run with nodemon)
- `npm run start` (This will execute with Node)

## Next Steps

There are folders for routes, schemas, and controllers. Moving forward, I hope to implement ways to store other kinds of content such as custom headers, custom footers, images, and so on.