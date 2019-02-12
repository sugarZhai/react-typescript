const logPath = '/alidata1/admin/tac-product-web/logs/';

module.exports = {
  dev: {
    appenders: {
      infoLogger: {
        type: 'stdout'
      },
      errorLogger: {
        type: 'stdout'
      },
      access: {
        type: 'stdout'
      }
    },
    categories: {
      default: {
        appenders: ['infoLogger'],
        level: 'all'
      },
      error: {
        appenders: ['errorLogger'],
        level: 'error'
      }
    }
  },
  test: {
    appenders: {
      infoLogger: {
        type: 'dateFile',
        filename: `${logPath}all.log`,
        pattern: '.yyyy-MM-dd',
        compress: true
      },
      errorLogger: {
        type: 'dateFile',
        filename: `${logPath}error.log`,
        pattern: '.yyyy-MM-dd',
        compress: true
      }
    },
    categories: {
      default: {
        appenders: ['infoLogger'],
        level: 'debug'
      },
      error: {
        appenders: ['errorLogger'],
        level: 'error'
      }
    }
  },
  pre: {
    appenders: {
      infoLogger: {
        type: 'dateFile',
        filename: `${logPath}all.log`,
        pattern: '.yyyy-MM-dd',
        compress: true
      },
      errorLogger: {
        type: 'dateFile',
        filename: `${logPath}error.log`,
        pattern: '.yyyy-MM-dd',
        compress: true
      }
    },
    categories: {
      default: {
        appenders: ['infoLogger'],
        level: 'debug'
      },
      error: {
        appenders: ['errorLogger'],
        level: 'error'
      }
    }
  },
  prd: {
    appenders: {
      infoLogger: {
        type: 'dateFile',
        filename: `${logPath}all.log`,
        pattern: '.yyyy-MM-dd',
        compress: true
      },
      errorLogger: {
        type: 'dateFile',
        filename: `${logPath}error.log`,
        pattern: '.yyyy-MM-dd',
        compress: true
      }
    },
    categories: {
      default: {
        appenders: ['infoLogger'],
        level: 'debug'
      },
      error: {
        appenders: ['errorLogger'],
        level: 'error'
      }
    }
  }
}
