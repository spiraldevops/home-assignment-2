module.exports = {
  serverPort: process.env.PORT || 5000,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  mysqlUser: process.env.MYSQLUSER,
  mysqlHost: process.env.MYSQLHOST,
  mysqlDatabase: process.env.MYSQLDATABASE,
  mysqlPassword: process.env.MYSQLPASSWORD,
  mysqlPort: process.env.MYSQLPORT
};
