const { Log } = require('../middleware/logger');

let connected = false;

async function connect() {
  await mongoose.connect(process.env.DB_URL)
  connected = true;
  await Log('backend', 'info', 'db', 'Database connection established (stub)');
}

function isConnected() {
  return connected;
}

module.exports = { connect, isConnected };
