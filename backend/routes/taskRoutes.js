var express = require('express');
const {getTasks, createTasks} = require("../controller/taskController");

var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a task');
});

router.get("/getTasks",getTasks);
router.post("/create", createTasks);

module.exports = router;