const { factory, expect, serverConfig } = require("../../helpers");

let request, response, book;

describe("DELETE /api/books/:id", () => {
  before((done) => {
    request = serverConfig(done);
  });

  afterEach(async () => {
    await factory.cleanUp();
  });

  describe("successfully", () => {
    beforeEach(async () => {
      book = await factory.create("Book", { title: "The Divine Comedy" });
      response = await request.delete(`/api/books/${book.id}`);
    });

    it("is expected to respond with status 202", () => {
      expect(response.status).to.equal(202);
    });

    it("is expected to respond with a successful message", () => {
      expect(response.body.message).to.equal("Book successfully deleted.");
    });
  });

  describe("unsuccessfully", () => {
    describe("due to id not found", () => {
      beforeEach(async () => {
        response = await request.delete("/api/books/9999");
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
        response = await request.delete("/api/books/AIUDHSD");
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
