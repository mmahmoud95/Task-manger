const express = require("express");
var router = express.Router();
const { createTask, updateTask, deleteTask, getTasks } = require("../controller/taskController");
const auth = require("../middlewares/auth");

router.get("/", auth, getTasks);

router.post("/", auth, createTask);
router.patch('/:id', auth, updateTask);
router.delete("/:id", auth, deleteTask);


module.exports = router;