const axios = require('axios');
const config = require('../config/config');

const publicClient = axios.create({
  baseURL: config.evaluationBaseUrl,
  timeout: 10000,
});

function createAuthedClient(getToken) {
  const client = axios.create({
    baseURL: config.evaluationBaseUrl,
    timeout: 10000,
  });

  client.interceptors.request.use((req) => {
    const token = getToken();
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  return client;
}

module.exports = { publicClient, createAuthedClient };