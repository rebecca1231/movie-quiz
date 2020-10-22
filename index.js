const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const { MONGO_URI } = require("./config/dev");
const typeDefs = require("./GraphQl/typeDefs");
const resolvers = require("./GraphQl/resolvers");
const MoviesAPI = require('./MoviesAPI')

const PORT = process.env.PORT || 5000;

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      MoviesAPI: new MoviesAPI()
    }
  },
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Connected to Atlas`);
    return server.listen({ port: PORT });
  })
  .then((result) => {
    console.log(`Server listening on: ${result.url}`);
  })
  .catch((err) => {
    console.log(err);
  });

  //require('./routes/movieRoutes')(server)