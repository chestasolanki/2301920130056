const { fetchNotifications } = require('../repository/notificationRepository');

async function getAllNotifications() {
  return fetchNotifications();
}

module.exports = { getAllNotifications };
