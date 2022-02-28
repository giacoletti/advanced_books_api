const { factory, expect, serverConfig } = require("../../helpers");

let request, response, book;

describe("GET /api/books/:id", () => {
  before((done) => {
    request = serverConfig(done);
  });

  afterEach(async () => {
    await factory.cleanUp();
  });

  describe("successfully", () => {
    beforeEach(async () => {
      book = await factory.create("Book", { title: "Fun With Sequelize" });
      response = await request.get(`/api/books/${book.id}`);
    });

    it("is expected to respond with status 200", () => {
      expect(response.status).to.equal(200);
    });

    it("is expected to include the title", () => {
      expect(response.body["book"].title).to.equal("Fun With Sequelize");
    });
  });

  describe("unsuccessfully", () => {
    describe("due to id not found", () => {
      beforeEach(async () => {
        response = await request.get("/api/books/99999");
      });

      it("is expected to respond with status 404", () => {
        expect(response.status).to.equal(404);
      });

      it("is expected to respond with an error message", () => {
        expect(response.body.message).to.equal("The book cannot be found.");
      });
    });
  });
});
