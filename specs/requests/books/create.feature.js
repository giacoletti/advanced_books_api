const { expect, serverConfig, Models } = require("../../helpers");

let request, response, book;

describe("POST /api/books", () => {
  before((done) => {
    request = serverConfig(done);
  });

  afterEach(async () => {
    await Models.Book.destroy({
      truncate: true
    });
    await Models.Author.destroy({
      truncate: true,
      cascade: true // allows to drop table referenced in a foreign key constraint
    });
  });

  describe("successfully", () => {
    beforeEach(async () => {
      response = await request.post("/api/books").send({
        book: { title: "1984", author: "George Orwell" }
      });
      book = await Models.Book.findOne({
        where: { title: "1984" },
        include: [{ association: Models.Book.associations.author }]
      });
    });

    it("is expected to respond with status 200", () => {
      expect(response.status).to.equal(200);
    });

    it("is expected to respond with the created book", () => {
      expect(response.body.book.title).to.equal("1984");
    });

    it("is expected to respond with the book author", () => {
      expect(response.body.book.author.name).to.equal("George Orwell");
    });

    describe("resource properties", () => {
      it("is expected to include :id, :title, :author.name", () => {
        const expectedJson = {
          AuthorId: book.AuthorId,
          id: book.id,
          title: book.title,
          author: {
            id: book.author.id,
            name: book.author.name,
            createdAt: book.author.createdAt.toJSON(),
            updatedAt: book.author.updatedAt.toJSON()
          },
          createdAt: book.createdAt.toJSON(),
          updatedAt: book.updatedAt.toJSON()
        };
        expect(response.body["book"]).to.deep.equal(expectedJson);
      });

      it("is expected to include :author", () => {
        expect(response.body["book"]).to.have.own.property("author");
      });
    });
  });

  describe("unsuccessfully", () => {
    describe("due to missing title", () => {
      beforeEach(async () => {
        response = await request.post("/api/books").send({
          book: { author: "George Orwell" }
        });
      });

      it("is expected to respond with status 422", () => {
        expect(response.status).to.equal(422);
      });

      it("is expected to respond with an error message", () => {
        expect(response.body.message).to.equal(
          "notNull Violation: Book.title cannot be null"
        );
      });
    });

    describe("due to missing author", () => {
      beforeEach(async () => {
        response = await request.post("/api/books").send({
          book: { title: "1984" }
        });
      });

      it("is expected to respond with status 422", () => {
        expect(response.status).to.equal(422);
      });

      it("is expected to respond with an error message", () => {
        expect(response.body.message).to.equal(
          "notNull Violation: Book.author cannot be null"
        );
      });
    });
  });
});
