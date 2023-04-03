module.exports = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT || 6379,
  mysqlUser: process.env.MYSQLUSER,
  mysqlHost: process.env.MYSQLHOST,
  mysqlDatabase: process.env.MYSQLDATABASE,
  mysqlPassword: process.env.MYSQLPASSWORD,
  mysqlPort: process.env.MYSQLPORT || 3306
};
