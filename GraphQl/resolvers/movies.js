module.exports = {
  Query: {
    getMovieDetail: async (_source, { id }, { dataSources }) => {
      return dataSources.moviesAPI.getMovieDetail(id);
    },
    getMovieList: async (_source, { searchTerm }, { dataSources }) => {
      return dataSources.moviesAPI.getMovieList(searchTerm);
    },
  },
};
