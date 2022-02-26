const { factory, expect, serverConfig } = require("../../helpers");

let request, response, book, author;

xdescribe("POST /api/books", () => {
  before((done) => {
    request = serverConfig(done);
  });

  afterEach(async () => {
    await factory.cleanUp();
  });

  beforeEach(async () => {
    response = await request.post("/api/books").send({
      book: { title: "1984", author: "George Orwell" }
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
    xit("is expected to include :id, :title, :author.name", () => {
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