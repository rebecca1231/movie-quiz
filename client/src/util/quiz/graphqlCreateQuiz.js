import gql from 'graphql-tag'

export const CREATE_QUIZ_MUTATION = gql`
mutation($title: String!, $items: [Item]) {
  createQuiz(title:$title, items:$items){
    id
    title
    username
    createdAt
    items{
        question
        answer
    }
    comments {
      id
      body
      username
      createdAt
    }
    likes {
      id
      username
      createdAt
    }
    likeCount
    commentCount
  }
}
`;

/*
[{question: "Batman Begins", answer: "2005"},
{question: "Batman v Superman: Dawn of Justice", answer: "2016"},
{question: "Batman", answer: "1989"},
{question: "Batman Returns", answer: "1992"},
{question: "Batman Forever", answer: "1995"},
{question: "Batman & Robin", answer: "1997"},
{question: "The Lego Batman Movie", answer: "2017"},
{question: "Batman: The Animated Series", answer: "1992–1995"},
{question: "Batman: Under the Red Hood", answer: "2010"},
{question: "Batman: The Dark Knight Returns, Part 1", answer: "2012"}]
*/