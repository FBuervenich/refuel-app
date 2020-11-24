// vue.config.js
module.exports = {
  devServer: {
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    proxy: {
      '/*': {
        target: 'http://localhost:3000',
        logLevel: 'debug',
        test: 'test',
      },
    },
  },
};
