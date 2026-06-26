const { fetchDepots } = require('../repository/depotRepository');

async function getAllDepots() {
  return fetchDepots();
}

module.exports = { getAllDepots };
