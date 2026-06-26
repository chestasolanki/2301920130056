const { getAllNotifications } = require('../service/notificationService');
const { Log } = require('../middleware/logger');

async function getNotifications(req, res) {
  try {
    const notifications = await getAllNotifications();
    res.status(200).json({ notifications });
  } catch (err) {
    await Log('backend', 'error', 'controller', `getNotifications failed: ${err.message}`);
    res.status(502).json({ message: 'Failed to fetch notifications from evaluation service' });
  }
}

module.exports = { getNotifications };
