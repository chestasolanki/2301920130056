const { authedClient } = require('../auth/authStore');
const { Depot } = require('../domain/depot');
const { Log } = require('../middleware/logger');

async function fetchDepots() {
  try {
    const { data } = await authedClient.get('/depot');
    const list = data.depots || data.depot || [];
    return list.map((d) => new Depot(d));
  } catch (err) {
    await Log('backend', 'error', 'repository', `fetchDepots failed: ${err.message}`);
    throw err;
  }
}

module.exports = { fetchDepots };
