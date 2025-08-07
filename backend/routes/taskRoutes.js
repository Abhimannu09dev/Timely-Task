var express = require('express');
const {getTasks, createTasks, updateTask, deleteTask} = require("../controller/taskController");
const { route } = require('.');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a task');
});

router.get("/getTasks",getTasks);
router.post("/create", createTasks);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

module.exports = router;