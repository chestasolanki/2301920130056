const config = require('../config/config');
const { publicClient, createAuthedClient } = require('../utils/httpClient');

let currentToken = process.env.AUTH_TOKEN || null;
let tokenExpiresAt = null; 

function getToken() {
  return currentToken;
}

function setToken(token, expiresInSeconds) {
  currentToken = token;
  tokenExpiresAt = expiresInSeconds
    ? Date.now() + expiresInSeconds * 1000
    : null;
}

function isTokenExpired() {
  if (!currentToken) return true;
  if (!tokenExpiresAt) return false;
  return Date.now() >= tokenExpiresAt;
}


async function authenticate() {
  const { clientID, clientSecret } = config.credentials;

  if (!clientID || !clientSecret) {
    throw new Error('Missing CLIENT_ID/CLIENT_SECRET. Run `npm run register` first.');
  }

  const { data } = await publicClient.post('/auth', {
    clientID,
    clientSecret,
  });

  const token = data.accessToken || data.token;
  const expiresIn = data.expiresIn;

  if (!token) {
    throw new Error('Auth response did not contain a token. Check field name against API docs.');
  }

  setToken(token, expiresIn);
  return token;
}

async function ensureAuthenticated() {
  if (isTokenExpired()) {
    await authenticate();
  }
  return currentToken;
}

const authedClient = createAuthedClient(getToken);

module.exports = {
  authenticate,
  ensureAuthenticated,
  getToken,
  setToken,
  authedClient,
};
