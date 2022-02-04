const { factory, expect, serverConfig } = require("../../helpers");

let request, response, books, author;

describe("GET /api/books", () => {
  before((done) => {
    request = serverConfig(done);
  });

  afterEach(async () => {
    await factory.cleanUp();
  });

  beforeEach(async () => {
    // create your factories here
    author = await factory.create("Author");
    books = await factory.createMany("Book", 5, [
      { title: "The Bible", AuthorId: author.id }
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
    it("is expected to include :id, :title, :author.name", () => {
      const expectedJson = {
        id: books[0].id,
        title: "The Bible",
        author: {
          name: author.name
        }
      };
      expect(response.body["books"][0]).to.deep.equal(expectedJson);
    });

    it('is expected to include :author', () => {
      expect(response.body["books"][0]).to.have.own.property("author");
    });
  });
});
