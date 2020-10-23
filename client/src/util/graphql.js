import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        body
        createdAt
      }
    }
  }
`;

export const FETCH_QUIZZES_QUERY = gql`
  {
    getQuizzes {
      id
      title
      createdAt
      username
      items {
        question
        answer
      }
    }
  }
`;

export const GET_QUIZ_QUERY = gql`
  query($quizId: ID!) {
    getQuiz(quizId: $quizId) {
      title
      id
      createdAt
      username
      items {
        question
        answer
        imdbId
      }
    }
  }
`;
