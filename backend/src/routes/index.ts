import express = require("express");

const router = express.Router();

router.get("/", (req: any, res: any) => {
  res.render("index", { title: "Express" });
});

export = router;
