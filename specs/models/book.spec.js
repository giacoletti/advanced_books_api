const { expect, factory, pending, Models } = require("../helpers");
const { Association, DataTypes } = require("sequelize");
const { Book } = Models;

describe("ModelName", () => {
  BookModel = new Book();
  const { tableName, tableAttributes, associations } = BookModel.constructor;

  beforeEach(async () => {
    subject = await factory.create("Book");
  });

  describe("Model", () => {
    it('is expected to have table name "Books"', () => {
      expect(tableName).to.equal("Books");
    });

    describe("is expected to have property:", () => {
      it("title:STRING", () => {
        expect(tableAttributes).to.have.own
          .property("title")
          .that.has.property("type")
          .to.be.instanceOf(DataTypes.STRING);
      });

      it("author:STRING", () => {
        expect(tableAttributes).to.have.own
          .property("author")
          .that.has.property("type")
          .to.be.instanceOf(DataTypes.STRING);
      });
    });
  });

  describe("Instance", () => {
    it("is expected to have a valid factory", () => {
      expect(subject).to.include({
        title: "My awesome book",
        author: "Thomas"
      });
    });

    describe("is expected to have properties", () => {
      it("title", () => {
        expect(subject).to.have.property("title").to.be.a("string");
      });

      it("author", () => {
        expect(subject).to.have.property("author").to.be.a("string");
      });
    });
  });
});
