const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/get-route', apiController.getRoute);

module.exports = router;
