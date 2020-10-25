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
        
      }
    }
  }
`;
