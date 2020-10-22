const { RESTDataSource } = require('apollo-datasource-rest');
const APIKEY = process.env.OMDB_APIKEY;


class MoviesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://www.omdbapi.com/'
  }
  
  async getMovieList(searchTerm) {
      const data = await this.get(`?apikey=${APIKEY}&
      s=${searchTerm}`);
      console.log('getMovieList', data)
      return data;    
  }

  async getMovieDetail(searchTerm) {
      const data = await this.get(`?apikey=${APIKEY}&
      i=${searchTerm}`);
      console.log('getMovieDetail', data)

    return data
  }
}
  
