const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const { MONGODB } = require("./config");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to DB");
    return server.listen({ port: 3002 });
  })
  .then(({ url }) => console.log("Server up and running on : " + url));
