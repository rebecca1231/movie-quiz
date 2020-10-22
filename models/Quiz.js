const { model, Schema } = require("mongoose");

const quizSchema = new Schema({
  title: String,
  createdAt: String,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  items: [],
});

module.exports = model("Quiz", quizSchema);
