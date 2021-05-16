import { Request, Response, NextFunction } from 'express';
import Status from 'http-status';

/* istanbul ignore next */
const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-line no-unused-vars
  const { logger } = req.container.cradle;

  logger.error(err);

  res.status(Status.INTERNAL_SERVER_ERROR).json({
    type: 'InternalServerError',
    message: err.message,
    stack: err.stack,
  });
};

export default errorHandler;
