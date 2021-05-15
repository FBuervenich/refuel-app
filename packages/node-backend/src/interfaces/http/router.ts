import { Router } from 'express';
import statusMonitor from 'express-status-monitor';
import bodyParser from 'body-parser';
import compression from 'compression';
import methodOverride from 'method-override';
import controller from './utils/createControllerRoutes';
import UsersController from './user/UsersController';
import RefuelingsController from './refueling/RefuelingsController';

const router = ({
  config,
  containerMiddleware,
  loggerMiddleware,
  errorHandler,
  swaggerMiddleware,
}): Router => {
  const router = Router();

  /* istanbul ignore if */
  if (config.env === 'development') {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if (config.env !== 'test') {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  apiRouter.use('/users', controller(UsersController));
  apiRouter.use('/refuelings', controller(RefuelingsController));

  router.use('/api', apiRouter);

  router.use(errorHandler);

  return router;
};

export default router;
