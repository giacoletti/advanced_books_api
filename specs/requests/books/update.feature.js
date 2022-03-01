const { factory, expect, serverConfig } = require("../../helpers");

let request, response, book;

describe("PUT /api/books/:id", () => {
  before((done) => {
    request = serverConfig(done);
  });

  afterEach(async () => {
    await factory.cleanUp();
  });

  describe("successfully", () => {
    beforeEach(async () => {
      author = await factory.create("Author", {
        name: "Antoine de Saint-Exupery"
      });
      book = await factory.create("Book", {
        title: "The Little Kid",
        AuthorId: author.id
      });
      response = await request.put(`/api/books/${book.id}`).send({
        book: { title: "The Little Prince" }
      });
    });

    it("is expected to respond with status 200", () => {
      expect(response.status).to.equal(200);
    });

    it("is expected to respond with successful message", () => {
      expect(response.body.message).to.equal("The book has been updated.");
    });
  });

  describe("unsuccessfully", () => {
    describe("due to id not found", () => {
      beforeEach(async () => {
        response = await request.put("/api/books/999999").send({
          book: { title: "The Little Prince" }
        });
      });

      it("is expected to respond with status 404", () => {
        expect(response.status).to.equal(404);
      });

      it("is expected to respond with an error message", () => {
        expect(response.body.message).to.equal("The book cannot be found.");
      });
    });

    describe("due to invalid id", () => {
      beforeEach(async () => {
        response = await request.put("/api/books/AHDKSAD").send({
          book: { title: "The Little Prince" }
        });
      });

      it("is expected to respond with status 400", () => {
        expect(response.status).to.equal(400);
      });

      it("is expected to respond with an error message", () => {
        expect(response.body.message).to.equal("The book ID is not valid.");
      });
    });
  });
});
