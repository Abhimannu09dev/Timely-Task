import express = require("express");
import { getTasks, createTasks, updateTask, deleteTask } from "../controller/taskController";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.send("respond with a task");
});

router.get("/getTasks", getTasks);
router.post("/create", createTasks);
router.put("/update/:id", updateTask);
router.delete("/delete/:id", deleteTask);

export = router;
