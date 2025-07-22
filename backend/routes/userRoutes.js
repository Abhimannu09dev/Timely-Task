var express = require('express');
const { createUser, loginUser } = require('../controller/userController');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', createUser);
router.post('/login', loginUser);

module.exports = router;