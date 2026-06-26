const { getAllDepots } = require('../service/depotService');
const { Log } = require('../middleware/logger');

async function getDepots(req, res) {
  try {
    const depots = await getAllDepots();
    res.status(200).json({ depots });
  } catch (err) {
    await Log('backend', 'error', 'controller', `getDepots failed: ${err.message}`);
    res.status(502).json({ message: 'Failed to fetch depots from evaluation service' });
  }
}

module.exports = { getDepots };
