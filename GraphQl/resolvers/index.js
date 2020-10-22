const postResolver = require("./posts");
const userResolver = require("./users");
const commentResolver = require("./comments");
const quizResolver = require("./quizzes");
const quizItemResolver = require("./quizItems");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: {
    ...postResolver.Query,
    ...quizResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...postResolver.Mutation,
    ...commentResolver.Mutation,
    ...quizResolver.Mutation,
    ...quizItemResolver.Mutation,
  },
  Subscription: {
    ...postResolver.Subscription,
  },
};
