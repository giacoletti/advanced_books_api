module.exports = (factory, Models) => {
  factory.define("Author", Models.Author, {
    name: "Giovanni",
    createdAt: new Date(),
    updatedAt: new Date()
  });
};
