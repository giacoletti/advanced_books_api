const { factory, expect, serverConfig } = require("../../helpers");

let request, response, book, author;

describe("POST /api/books", () => {
  before((done) => {
    request = serverConfig(done);
  });

  afterEach(async () => {
    await factory.cleanUp();
  });

  beforeEach(async () => {
    author = await factory.create("Author", { name: "George Orwell" });
    book = await factory.create("Book", {
      title: "1984",
      AuthorId: author.id
    });
    response = await request.post("/api/books").send({
      book: { title: book.title, author: author.name }
    });
  });

  it("is expected to respond with status 200", () => {
    expect(response.status).to.equal(200);
  });

  it("is expected to respond with the created book", () => {
    expect(response.body["book"].title).to.equal("1984");
  });

  describe("resource properties", () => {
    it("is expected to include :id, :title, :author.name", () => {
      const expectedJson = {
        id: book.id,
        title: book.title,
        author: {
          name: author.name
        }
      };
      expect(response.body["book"]).to.deep.equal(expectedJson);
    });

    it("is expected to include :author", () => {
      expect(response.body["book"]).to.have.own.property("author");
    });
  });
});
