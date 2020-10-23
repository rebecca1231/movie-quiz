const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");
const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config()

const { MONGO_URI } = require("./config/dev");
const typeDefs = require("./GraphQl/typeDefs");
const resolvers = require("./GraphQl/resolvers");
const APIKEY = process.env.OMDB_APIKEY;

//setup Open Movie DB API
class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://www.omdbapi.com/'
  }
  
  async getMovieList(searchTerm) {
      const data = await this.get(`?apikey=${APIKEY}&s=${searchTerm}`);
      return data.Search;    
  }

  async getMovieDetail(searchTerm) {
    const data = await this.get(`?apikey=${APIKEY}&i=${searchTerm}`);
    return data
  }
}
  

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