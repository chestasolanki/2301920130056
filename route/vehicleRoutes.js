const express = require('express');
const { getVehicles } = require('../controller/vehicleController');

const router = express.Router();

router.get('/', getVehicles);

module.exports = router;