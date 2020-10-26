import gql from "graphql-tag";

export const FETCH_MOVIE_LIST_QUERY = gql`
  query($searchTerm: String!) {
    getMovieList(searchTerm: $searchTerm) {
      title
      createdAt
      items {
        question
        answer
        imdbId
        poster
      }
    }
  }
`;

export const FETCH_MOVIE_DETAIL_QUERY = gql`
  query($searchTerm: String!) {
    getMovieDetail(searchTerm: $searchTerm) {
      title
      year
      rated
      runtime
      actors
      awards
      director
      plot
      poster
      genre
      rating
      metascore
    }
  }
`;
