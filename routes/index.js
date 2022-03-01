const express = require("express");
const router = express.Router();
const { booksController } = require("../controllers");

/* Create routes for each controller in your application. */
router
  .get("/books", booksController.index)
  .get("/books/:id", booksController.show)
  .post("/books", booksController.create)
  .delete("/books/:id", booksController.delete)
  .put("/books/:id", booksController.update);

module.exports = router;
