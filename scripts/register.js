
require('dotenv').config();
const { publicClient } = require('../utils/httpClient');
const config = require('../config/config');

async function register() {
  const { email, name, mobileNo, githubUsername, rollNo, accessCode } = config.registrant;

  const missing = Object.entries({ email, name, mobileNo, githubUsername, rollNo, accessCode })
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length) {
    console.error(`Missing required .env fields: ${missing.join(', ')}`);
    process.exit(1);
  }

  try {
    const { data } = await publicClient.post('/register', {
      email,
      name,
      mobileNo,
      githubUsername,
      rollNo,
      accessCode,
    });

    console.log('Registration successful. SAVE THESE NOW — they cannot be retrieved again:');
    console.log(`CLIENT_ID=${data.clientID}`);
    console.log(`CLIENT_SECRET=${data.clientSecret}`);
  } catch (err) {
    console.error('Registration failed:', err.response?.data || err.message);
    process.exit(1);
  }
}

register();
