const withTypescript = require('@zeit/next-typescript')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const withCSS = require('@zeit/next-css')
const { gwPath, env } = require('./config/env')
// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}

module.exports = withBundleAnalyzer(withTypescript(withCSS({
  useFileSystemPublicRoutes: false,
  target: "serverless",
  assetPrefix:  `${env === 'prd' ? 'https://dm.zacdn.cn' : ''}${gwPath}`,
  // publicRuntimeConfig: { // Will be available on both server and client
  //   deployEnv: env // Pass through env variables
  // },
  webpack(config, options) {
    // Unshift polyfills in main entrypoint.
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js']) {
        entries['main.js'].unshift('babel-polyfill');
      }
      return entries;
    };

    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192,
            fallback: "file-loader",
            publicPath: `${env === 'prd' ? 'https://dm.zacdn.cn' : ''}${gwPath}/_next/static/img/`,
            outputPath: `${options.isServer ? "../" : ""}static/img/`,
            name: "[hash].[ext]"
          }
        }
      ]
    });
    return config;
  },
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html'
    }
  },
})))
