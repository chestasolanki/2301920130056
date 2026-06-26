const { authedClient } = require('../auth/authStore');
const { Notification } = require('../domain/notification');
const { Log } = require('../middleware/logger');


async function fetchNotifications() {
  try {
    const { data } = await authedClient.get('/notifications');
    const list = data.notifications || [];
    return list.map((n) => new Notification(n));
  } catch (err) {
    await Log('backend', 'error', 'repository', `fetchNotifications failed: ${err.message}`);
    throw err;
  }
}

module.exports = { fetchNotifications };
