function setGlobals() {
  const { REDIS_HOST, REDIS_PORT, REDIS_DB } = process.env;
  global.__REDISCONFIG__ = {};
  global.__REDISCONFIG__.HOST = REDIS_HOST;
  global.__REDISCONFIG__.PORT = REDIS_PORT;
  global.__REDISCONFIG__.DB = REDIS_DB;
  global.__REDISCONFIG__.REDISINSTANCE = null;
  global.__REDIS_SUBSCRIPTION__ = {};
}

module.exports = {
  setGlobals
};
