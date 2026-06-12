import express = require("express");
import { createUser, loginUser } from "../controller/userController";

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.send("respond with a resource");
});

router.post("/create", createUser);
router.post("/login", loginUser);

export = router;
