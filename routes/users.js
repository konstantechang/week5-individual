const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const successHandler = require('../utils/successHandler');
const errorHandler = require('../utils/errorHandler');



/* GET users listing. */
router.get('/', async (req, res, next)  => {
  const users = await User.find({});
  successHandler(res, '取得users資料', users);
  //res.send('respond with a resource');
});

module.exports = router;
