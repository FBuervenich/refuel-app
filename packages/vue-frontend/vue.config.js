const webpack = require('webpack'); //to access built-in plugins
const { gitDescribeSync } = require('git-describe');
const package = require('./package.json');

const isProdEnv = process.env.NODE_ENV === 'production';
const isDevEnv = process.env.NODE_ENV === 'development';
const publicPath = isProdEnv ? '/' : '/vuewebapp/';

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
  },
  transpileDependencies: ['vuex-module-decorators'],

  configureWebpack: config => {
    config.plugins = [
      ...config.plugins,
      new webpack.DefinePlugin({
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
      args[0].title = 'Refuel app';
      return args;
    });
  },
};

// process.env.VUE_APP_PUBLIC_PATH = publicPath;
// process.env.VUE_APP_VERSION = package.version;

// process.env.VUE_APP_COMMIT_HASH = gitDescribeSync().hash;
// process.env.VUE_APP_COMMIT_TAG = gitDescribeSync().tag;

// process.env.VUE_APP_BUILD_TIMESTAMP = new Date().toISOString();
