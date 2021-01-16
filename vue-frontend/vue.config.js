const webpack = require('webpack'); //to access built-in plugins

// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/vuewebapp/',
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
      new webpack.DefinePlugin({ VUE_APP_API_URL: process.env.API_URL }),
    ];
  },
};
