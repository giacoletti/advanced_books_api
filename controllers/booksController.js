const { Book, Author } = require("../models");

const booksController = {
  async index(request, response) {
    // query the db for the books
    const books = await Book.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: Author,
          as: "author",
          attributes: ["name"]
        }
      ]
    });
    response.json({ books: books });
  },
  async show(request, response) {
    try {
      const book = await Book.findByPk(request.params.id);
      if (book) {
        response.json({ book: book });
      } else {
        response.status(404).json({ message: "The book cannot be found." });
      }
    } catch (error) {
      response.status(400).json({ message: "The book ID is not valid." });
    }
  },
  async create(request, response) {
    const book = await Book.create(
      {
        title: request.body.book.title,
        author: {
          name: request.body.book.author
        }
      },
      {
        include: [{ association: Book.associations.author }]
      }
    );
    response.json({ book: book });
  },
  async delete(request, response) {
    try {
      const result = await Book.destroy({
        where: {
          id: request.params.id
        }
      });
      if (result === 1) {
        response.status(202).json({ message: "Book successfully deleted." });
      } else {
        response.status(404).json({ message: "The book cannot be found." });
      }
    } catch (error) {
      response.status(400).json({ message: "The book ID is not valid." });
    }
  },
  async update(request, response) {
    try {
      const book = await Book.update(
        { title: request.body.book.title },
        {
          where: {
            id: request.params.id
          }
        }
      );
      if (book[0]) {
        response.json({ message: "The book has been updated." });
      } else {
        response.status(404).json({ message: "The book cannot be found." });
      }
    } catch (error) {
      response.status(400).json({ message: "The book ID is not valid." });
    }
  }
};

module.exports = booksController;
