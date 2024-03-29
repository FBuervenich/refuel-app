const webpack = require('webpack'); //to access built-in plugins
const { gitDescribeSync } = require('git-describe');
const package = require('./package.json');

const APP_NAME = 'Refuel app';

const isProdEnv = process.env.NODE_ENV === 'production';
const isDevEnv = process.env.NODE_ENV === 'development';
const publicPath = isProdEnv ? '/' : '/';

// vue.config.js
module.exports = {
  publicPath,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api/': '/api/' },
        logLevel: 'debug',
      },
    },
    disableHostCheck: true,
  },
  transpileDependencies: ['vuex-module-decorators'],

  configureWebpack: config => {
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
        VUE_APP_NAME: JSON.stringify(APP_NAME),

        VUE_APP_API_URL: process.env.API_URL,
        VUE_APP_PUBLIC_PATH: JSON.stringify(publicPath),

        VUE_APP_ENV: JSON.stringify(process.env.NODE_ENV),
        VUE_APP_IS_PROD: JSON.stringify(isProdEnv),
        VUE_APP_IS_DEV: JSON.stringify(isDevEnv),
        VUE_APP_VERSION: JSON.stringify(package.version),
        VUE_APP_COMMIT_HASH: JSON.stringify(gitDescribeSync().hash),
        VUE_APP_COMMIT_TAG: JSON.stringify(gitDescribeSync().tag),
        VUE_APP_BUILD_TIMESTAMP: JSON.stringify(new Date().getTime()),
      }),
    ];
  },

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = APP_NAME;
      return args;
    });
  },
};
