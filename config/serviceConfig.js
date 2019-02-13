const serviceConfig = {
  dev: {
    mipPort: {
      domain: 'https://mip-test2.test.com'
    },
    dmJavaPort: {
      domain: 'https://mgw-daily.test.com'
    }
  },
  test: {
    mipPort: {
      domain: 'https://mip-test2.test.com'
    },
    dmJavaPort: {
      domain: 'https://mgw-daily.test.com'
    }
  },
  pre: {
    mipPort: {
      domain: 'https://mip-uat.test.com'
    },
    dmJavaPort: {
      domain: 'https://gwbk-uat.test.com'
    }
  },
  prd: {
    mipPort: {
      domain: 'https://mip.test.com'
    },
    dmJavaPort: {
      domain: 'https://gwbk.test.com'
    }
  }
}

export default serviceConfig
