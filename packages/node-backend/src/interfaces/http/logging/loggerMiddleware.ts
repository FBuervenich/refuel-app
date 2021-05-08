import morgan from 'morgan';
const LoggerStreamAdapter = require('src/infra/logging/LoggerStreamAdapter');

export default ({ logger }) => {
  return morgan('dev', {
    stream: LoggerStreamAdapter.toStream(logger),
  });
};
