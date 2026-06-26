const { authenticate } = require('../auth/authStore');
const { Log } = require('../middleware/logger');

function startTokenRefreshJob(intervalMs = 15 * 60 * 1000) {
  const timer = setInterval(async () => {
    try {
      await authenticate();
      await Log('backend', 'info', 'cron_job', 'Token refreshed successfully');
    } catch (err) {
      await Log('backend', 'error', 'cron_job', `Token refresh failed: ${err.message}`);
    }
  }, intervalMs);

  return () => clearInterval(timer);
}

module.exports = { startTokenRefreshJob };
