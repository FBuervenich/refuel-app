import morgan from 'morgan';
import LoggerStreamAdapter from '../../../infra/logging/LoggerStreamAdapter';

export default ({ logger }) => {
  return morgan('dev', {
    stream: LoggerStreamAdapter.toStream(logger),
  });
};
