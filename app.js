require('dotenv').config();
const express = require('express');
const config = require('./config/config');
const routes = require('./route');
const { requestLoggerMiddleware } = require('./middleware/logger');
const { authenticate } = require('./auth/authStore');
const { startTokenRefreshJob } = require('./cron_job/refreshToken');
const { connect: connectDb } = require('./db/connection');

const app = express();

app.use(express.json());
app.use(requestLoggerMiddleware);

app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

async function start() {
  try {
    await authenticate(); // fail fast if credentials are wrong/missing
    await connectDb();
    startTokenRefreshJob();

    app.listen(config.port, () => {
      // Startup banner only — not part of the application's logging requirement.
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
