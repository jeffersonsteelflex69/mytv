const express = require('express');
const router = express.Router();
let test = require('./test');

router.use("/test", test);

module.exports = router;
