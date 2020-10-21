const { model, Schema } = require("mongoose");

const quizSchema = new Schema({
  title:String,
  createdAt: String,
  data: []
});

module.exports = model("Quiz", quizSchema);
