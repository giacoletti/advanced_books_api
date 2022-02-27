const { factory, expect, serverConfig } = require("../../helpers");

let request, response, book;

describe("DELETE /api/books/:id", () => {
  before((done) => {
    request = serverConfig(done);
  });
  
  afterEach(async () => {
    await factory.cleanUp();
  });

  beforeEach(async () => {
    book = await factory.create("Book", { title: "The Divine Comedy" });
    response = await request.delete(`/api/books/${book.id}`);
  });

  it("is expected to respond with status 200", () => {
    expect(response.status).to.equal(200);
  });

  it("is expected to respond with a successful message", () => {
    expect(response.body.message).to.equal("Book successfully deleted.");
  });
});
