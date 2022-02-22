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
    const book = await Book.findByPk(request.params.id);
    response.json({ book: book });
  },
  async create(request, response) {
    const author = await Author.create({ name: request.body.book.author });
    const book = await Book.create({
      title: request.body.book.title,
      AuthorId: author.id
    });
    response.json({ book: book });
  }
};

module.exports = booksController;
