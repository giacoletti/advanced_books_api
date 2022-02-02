module.exports = (factory, Models) => {
  factory.define("Book", Models.Book, {
    title: "My awesome book",
    author: "Thomas",
    createdAt: new Date(),
    updatedAt: new Date()
  });
};
