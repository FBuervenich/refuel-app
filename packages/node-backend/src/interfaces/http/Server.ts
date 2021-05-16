import express, { Express } from 'express';
import cors from 'cors';
import { Config } from '../../../config';
import { Logger } from 'log4js';

export default class Server {
  private config: Config;
  private logger: Logger;
  private express: Express;

  constructor({ config, router, logger, authenticationMiddlewares }) {
    this.config = config;
    this.logger = logger;
    this.express = express();

    this.express.disable('x-powered-by');
    this.express.use(cors());
    this.express.use(...authenticationMiddlewares);

    this.express.use(router);
  }

  start() {
    return new Promise<void>(resolve => {
      const http = this.express.listen(this.config.web.port, () => {
        const port = http.address()['port'] ?? 3000;
        this.logger.info(`[p ${process.pid}] Listening at port ${port}`);
        resolve();
      });
    });
  }
}
