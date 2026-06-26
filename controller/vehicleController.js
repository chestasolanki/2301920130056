const { getAllVehicles, getVehiclesSortedByEfficiency } = require('../service/vehicleService');
const { Log } = require('../middleware/logger');

async function getVehicles(req, res) {
  try {
    const sortByEfficiency = req.query.sort === 'efficiency';
    const vehicles = sortByEfficiency
      ? await getVehiclesSortedByEfficiency()
      : await getAllVehicles();

    res.status(200).json({ vehicles });
  } catch (err) {
    await Log('backend', 'error', 'controller', `getVehicles failed: ${err.message}`);
    res.status(502).json({ message: 'Failed to fetch vehicles from evaluation service' });
  }
}

module.exports = { getVehicles };