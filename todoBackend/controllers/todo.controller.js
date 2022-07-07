const Todo = require("../models/Todo.model");

module.exports.todoContoller = {
  postTodo: async (req, res) => {
    try {
      const result = await Todo.create({
        text: req.body.text,
      });
      res.json(result);
    } catch (e) {
      res.json(e);
    }
  },
  patchTodo: async (req, res) => {
    try {
      const result = await Todo.findByIdAndUpdate(req.params.id, {
        text: req.body.text,
        done: req.body.done,
      });
      res.json(result);
    } catch (e) {
      res.json(e);
    }
  },
  getTodo: async (req, res) => {
    try {
      const result = await Todo.find();
      res.json(result);
    } catch (e) {
      res.json(e);
    }
  },
  deleteTodo: async (req, res) => {
    try {
      await Todo.findByIdAndRemove(req.params.id);
      res.json("и д1аели");
    } catch (e) {
      res.json(e);
    }
  },
};
