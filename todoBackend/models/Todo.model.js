const { mongoose } = require('mongoose');

const todoSchema = mongoose.Schema({
  text: String,
  done: {
      type: Boolean,
      default: false
  }
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo
