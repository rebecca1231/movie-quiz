const { ApolloServer, PubSub } = require("apollo-server-express");
const mongoose = require("mongoose");
const { RESTDataSource } = require('apollo-datasource-rest');
require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

const  MONGO_URI  = process.env.MONGO_URI;
const typeDefs = require("./GraphQl/typeDefs");
const resolvers = require("./GraphQl/resolvers");
const APIKEY = process.env.OMDB_APIKEY;

//setup Open Movie DB API
class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://www.omdbapi.com/'
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
  
//set up server
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

app.use(cors())
//setup db
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((db) => {
    console.log(`Connected to ${db.connections[0].name}`);
  })

  if (process.env.NODE_ENV === "production") {
    //express will serve up production assets
    //like main.js file, or main.css file
    app.use(express.static("client/build"));
  
    //express will serve up index.html file when
    //it doesn't recognize the route
    const path = require("path");
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }
  server.applyMiddleware({
    path: '/client', // you should change this to whatever you want
    app,
  });
  

app.listen(PORT, () =>
    console.log(
        `Server started, listening on port ${PORT} for incoming requests.`,
    ),
)