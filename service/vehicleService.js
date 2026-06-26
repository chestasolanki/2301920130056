const { fetchVehicles } = require('../repository/vehicleRepository');

async function getVehiclesSortedByEfficiency() {
  const vehicles = await fetchVehicles();
  return [...vehicles].sort((a, b) => b.efficiency - a.efficiency);
}

async function getAllVehicles() {
  return fetchVehicles();
}

module.exports = { getAllVehicles, getVehiclesSortedByEfficiency };
