import {
  createContainer,
  asClass,
  asFunction,
  asValue,
  InjectionMode,
} from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { ErrorRequestHandler, RequestHandler, Router } from 'express';
import { Logger } from 'log4js';

import config from '../config';
import { Config } from '../config';

import Application from './app/Application';
const {
  CreateUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
  DeleteUser,
} = require('./app/user');

const {
  CreateRefueling,
  GetAllRefuelings,
  GetRefueling,
  UpdateRefueling,
  DeleteRefueling,
} = require('./app/refueling');

const UserSerializer = require('./interfaces/http/user/UserSerializer');
const RefuelingSerializer = require('./interfaces/http/refueling/RefuelingSerializer');

import Server from './interfaces/http/Server';
import router from './interfaces/http/router';
import loggerMiddleware from './interfaces/http/logging/loggerMiddleware';
import errorHandler from './interfaces/http/errors/errorHandler';
import devErrorHandler from './interfaces/http/errors/devErrorHandler';
import swaggerMiddleware from './interfaces/http/swagger/swaggerMiddleware';

import logger from './infra/logging/logger';
import auth0Middlewares from './interfaces/http/authentication/auth0Middlewares';
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const SequelizeRefuelingsRepository = require('./infra/refueling/SequelizeRefuelingsRepository');
const {
  database,
  UserModel,
  RefuelingModel,
} = require('./infra/database/models');

export interface ICradle {
  // System
  app: Application;
  server: Server;
  router: Router;
  logger: Logger;
  config: Config;

  // Middlewares
  loggerMiddleware: ReturnType<typeof loggerMiddleware>;
  authenticationMiddlewares: RequestHandler[];
  containerMiddleware: RequestHandler;
  errorHandler: ErrorRequestHandler;
  swaggerMiddleware: RequestHandler[];
}

// const container = createContainer<ICradle>({
const container = createContainer({
  injectionMode: InjectionMode.PROXY,
  // injectionMode: InjectionMode.CLASSIC,
});

// System
container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton(),
  })
  .register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
  })
  .register({
    config: asValue(config),
  });

// Middlewares
container
  .register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton(),
  })
  .register({
    authenticationMiddlewares: asValue(auth0Middlewares),
  })
  .register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(config.production ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware]),
  });

// Repositories
container.register({
  usersRepository: asClass(SequelizeUsersRepository).singleton(),
  refuelingsRepository: asClass(SequelizeRefuelingsRepository).singleton(),
});

// Database
container.register({
  database: asValue(database),
  UserModel: asValue(UserModel),
  RefuelingModel: asValue(RefuelingModel),
});

// Operations
container.register({
  createUser: asClass(CreateUser),
  getAllUsers: asClass(GetAllUsers),
  getUser: asClass(GetUser),
  updateUser: asClass(UpdateUser),
  deleteUser: asClass(DeleteUser),

  createRefueling: asClass(CreateRefueling),
  getAllRefuelings: asClass(GetAllRefuelings),
  getRefueling: asClass(GetRefueling),
  updateRefueling: asClass(UpdateRefueling),
  deleteRefueling: asClass(DeleteRefueling),
});

// Serializers
container.register({
  userSerializer: asValue(UserSerializer),
  refuelingSerializer: asValue(RefuelingSerializer),
});

export default container;
