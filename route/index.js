const express = require('express');

const vehicleRoutes = require('./vehicleRoutes');
const depotRoutes = require('./depotRoutes');
const notificationRoutes = require('./notificationRoutes');

const router = express.Router();

router.use('/vehicles', vehicleRoutes);
router.use('/depot', depotRoutes);
router.use('/notifications', notificationRoutes);

module.exports = router;