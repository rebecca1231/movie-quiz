const { gql } = require("apollo-server");

module.exports = gql`
  type Quiz {
    id: ID!
    title:String!
    items: [QuizItem!]
    createdAt: String!
    username: String!
  }
  
  type QuizItem {
    question: String!
    answer: String!
  }
  type Score {
    correctCount:Int!
    questionCount:Int!
    quizTitle: String!
    username:String!
  }
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    correctCount:Int!
    questionCount:Int!
    quizTitle:String!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    getQuizzes: [Quiz]
    getQuiz(quizId:ID!): Quiz
    getMovieList(id:String!): Quiz
    getMovieDetail(searchTerm: String!): QuizItem    
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    createQuiz(title:String!): Quiz!
    createQuizItem(quizId: ID!, question: String!, answer: String!): Quiz!
    deleteQuiz(quizId: ID!): String!

  }
  type Subscription {
    newPost: Post!
  }
`;
