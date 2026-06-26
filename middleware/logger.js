const { authedClient } = require('../auth/authStore');
const { ensureAuthenticated } = require('../auth/authStore');

const VALID_STACKS = ['backend', 'frontend'];
const VALID_LEVELS = ['debug', 'info', 'warn', 'error', 'fatal'];
const VALID_PACKAGES = [
  
  'cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service',
  
  'api', 'component', 'hook', 'page', 'state', 'style',

  'auth', 'config', 'middleware', 'utils',
];


async function Log(stack, level, pkg, message) {
  if (!VALID_STACKS.includes(stack)) {
    throw new Error(`Invalid stack "${stack}". Must be one of ${VALID_STACKS.join(', ')}`);
  }
  if (!VALID_LEVELS.includes(level)) {
    throw new Error(`Invalid level "${level}". Must be one of ${VALID_LEVELS.join(', ')}`);
  }
  if (!VALID_PACKAGES.includes(pkg)) {
    throw new Error(`Invalid package "${pkg}". Must be one of ${VALID_PACKAGES.join(', ')}`);
  }

  await ensureAuthenticated();

  try {
    const { data } = await authedClient.post('/logs', {
      stack,
      level,
      package: pkg,
      message,
    });
    return data; 
  } catch (err) {
   
    console.error('Log API call failed:', err.response?.data || err.message);
    return null;
  }
}

/**
 * Express middleware: logs every request once it completes, with status-based level.
 */
function requestLoggerMiddleware(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';

    Log(
      'backend',
      level,
      'middleware',
      `${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
    );
  });

  next();
}

module.exports = { Log, requestLoggerMiddleware };
