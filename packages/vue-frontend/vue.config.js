const webpack = require('webpack'); //to access built-in plugins

const publicPath = process.env.NODE_ENV === 'production' ? '/' : '/vuewebapp/';

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
        APP_PUBLIC_PATH: publicPath,
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
