
const PATH_PREFIX_TEST = '/m/agile' //根据测试环境对应的Boom动态分配
const PATH_PREFIX = '/m/agile'

const env = typeof window === 'undefined' ? process.env.DEPLOY_ENV : window.DEPLOY_ENV
module.exports = {
  gwPath: env === 'test' ? PATH_PREFIX_TEST : PATH_PREFIX,
  env
}
