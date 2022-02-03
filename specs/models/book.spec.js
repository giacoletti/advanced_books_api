const { expect, factory, pending, Models } = require("../helpers");
const { Association, DataTypes } = require("sequelize");
const { Book } = Models;

describe("Book", () => {
  const { tableName, tableAttributes, associations } = Book;

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

      it("AuthorId:INTEGER", () => {
        expect(tableAttributes).to.have.own
          .property("AuthorId")
          .that.has.property("type")
          .to.be.instanceOf(DataTypes.INTEGER);
      });
    });

    describe("is expected to have associations", () => {
      it("Author:BelongsTo", () => {
        expect(associations).to.have.own
          .property("author")
          .to.be.instanceOf(Association.BelongsTo)
          .that.has.property("foreignKey", "AuthorId");
      });
    });
  });

  describe("Instance", () => {
    it("is expected to have a valid factory", () => {
      expect(subject).to.include({
        title: "My awesome book"
      });
    });

    describe("is expected to have properties", () => {
      it("title", () => {
        expect(subject).to.have.property("title").to.be.a("string");
      });
    });

    describe("is expected to have association accessors", () => {
      it("for the author association", () => {
        expect(subject).to
          .respondTo("getAuthor")
          .and.respondTo("setAuthor")
          .and.respondTo("createAuthor");
      });
    });
  });
});
