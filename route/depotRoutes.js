const express = require('express');
const { getDepots } = require('../controller/depotController');

const router = express.Router();

router.get('/', getDepots);

module.exports = router;