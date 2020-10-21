const { model, Schema } = require("mongoose");

const postSchema = new Schema({
  body: String,
  username: String,
  createdAt: String,
  correctCount: Number,
  questionCount: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  quiz: {
    type: Schema.Types.ObjectId,
    ref: "quizzes",
  },
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
});

module.exports = model("Post", postSchema);
