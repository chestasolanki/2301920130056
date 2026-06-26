require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  evaluationBaseUrl: process.env.EVALUATION_BASE_URL || 'http://4.224.186.213/evaluation-service',

  registrant: {
    email: process.env.EMAIL,
    name: process.env.NAME,
    mobileNo: process.env.MOBILE_NO,
    githubUsername: process.env.GITHUB_USERNAME,
    rollNo: process.env.ROLL_NO,
    accessCode: process.env.ACCESS_CODE,
  },

  credentials: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  },
};
