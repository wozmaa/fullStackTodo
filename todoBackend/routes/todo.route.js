const { Router } = require("express");
const { todoContoller } = require("../controllers/todo.controller");

const router = Router();

router.post("/todo", todoContoller.postTodo);
router.get("/todo", todoContoller.getTodo);
router.patch("/todo/:id", todoContoller.patchTodo);
router.delete("/todo/:id", todoContoller.deleteTodo);

module.exports = router;
