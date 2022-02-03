const { factory, expect, serverConfig } = require("../../helpers");

let request, response, books;

describe("GET /api/books", () => {
  before((done) => {
    request = serverConfig(done);
  });

  afterEach(async () => {
    await factory.cleanUp();
  });

  beforeEach(async () => {
    // create your factories here
    books = await factory.createMany("Book", 5, [
      { title: "The Bible", author: "God" }
    ]);
    response = await request.get("/api/books");
  });

  it("is expected to respond with status 200", () => {
    expect(response.status).to.equal(200);
  });

  it("is expected to respond with a list of 5 books", () => {
    expect(response.body["books"].length).to.equal(5);
  });

  describe("resource properties", () => {
    it("is expected to include :id & :title", () => {
      const expectedJson = {
        id: books[0].id,
        title: "The Bible"
      };
      expect(response.body["books"][0]).to.deep.equal(expectedJson);
    });
  });
});
