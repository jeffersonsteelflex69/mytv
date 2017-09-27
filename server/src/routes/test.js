const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

router.get('/', (req, res) => {
	res.send("yo test");	
});

module.exports = router;
