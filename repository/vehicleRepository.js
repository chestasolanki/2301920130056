const { authedClient } = require('../auth/authStore');
const { VehicleTask } = require('../domain/vehicle');
const { Log } = require('../middleware/logger');

async function fetchVehicles() {
  try {
    const { data } = await authedClient.get('/vehicles');
    const list = data.vehicles || [];
    return list.map((v) => new VehicleTask(v));
  } catch (err) {
    await Log('backend', 'error', 'repository', `fetchVehicles failed: ${err.message}`);
    throw err;
  }
}

module.exports = { fetchVehicles };
