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
};
