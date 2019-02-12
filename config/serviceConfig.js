const serviceConfig = {
  dev: {
    mipPort: {
      domain: 'https://mip-test2.zhongan.com'
    },
    dmJavaPort: {
      domain: 'https://mgw-daily.zhongan.com'
    }
  },
  test: {
    mipPort: {
      domain: 'https://mip-test2.zhongan.com'
    },
    dmJavaPort: {
      domain: 'https://mgw-daily.zhongan.com'
    }
  },
  pre: {
    mipPort: {
      domain: 'https://mip-uat.zhongan.com'
    },
    dmJavaPort: {
      domain: 'https://gwbk-uat.zhongan.com'
    }
  },
  prd: {
    mipPort: {
      domain: 'https://mip.zhongan.com'
    },
    dmJavaPort: {
      domain: 'https://gwbk.zhongan.com'
    }
  }
}

export default serviceConfig
