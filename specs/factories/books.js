module.exports = (factory, Models) => {
  factory.define("Book", Models.Book, {
    title: "My awesome book",
    AuthorId: factory.assoc("Author", "id"),
    createdAt: new Date(),
    updatedAt: new Date()
  });
};
