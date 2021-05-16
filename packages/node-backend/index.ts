import Application from './src/app/Application';
import container from './src/container';

const app: Application = container.resolve('app');

app.start().catch(error => {
  app.logger.error(error.stack);
  process.exit();
});
