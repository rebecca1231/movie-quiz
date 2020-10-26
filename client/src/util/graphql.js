import gql from "graphql-tag";

export const FETCH_QUIZZES_QUERY = gql`
  {
    getQuizzes {
      id
      title
      createdAt
      username
      likes{
        username
      }
      comments{
        id
        username
        body
        createdAt
      }
      commentCount
      likeCount
      items {
        question
        answer
        poster
      }
    }
  }
`;

export const GET_QUIZ_QUERY = gql`
  query($quizId: ID!) {
    getQuiz(quizId: $quizId) {
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
      likeCount
    
      likes{
        username
      }
      title
      id
      createdAt
      username
      items {
        question
        answer
        poster
      }
    }
  }
`;
