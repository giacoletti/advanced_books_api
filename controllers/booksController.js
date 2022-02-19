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
  async create(request, response){
    
  }
};

module.exports = booksController;
