import { Logger } from 'log4js';
import { Sequelize } from 'sequelize';
import Server from '../interfaces/http/Server';

export default class Application {
  private server: Server;
  private database: Sequelize;
  logger: Logger;

  constructor({ server, database, logger }) {
    this.server = server;
    this.database = database;
    this.logger = logger;

    if (database && database.options.logging) {
      database.options.logging = logger.info.bind(logger);
    }
  }

  async start() {
    if (this.database) {
      await this.database.authenticate();
    }

    await this.server.start();
  }
}
