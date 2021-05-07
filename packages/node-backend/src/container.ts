import {
  createContainer,
  asClass,
  asFunction,
  asValue,
  InjectionMode,
} from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { Router } from 'express';
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
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

import logger from './infra/logging/logger';
const auth0Middleware = require('./infra/authentication/auth0middleware');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const SequelizeRefuelingsRepository = require('./infra/refueling/SequelizeRefuelingsRepository');
const {
  database,
  UserModel,
  RefuelingModel,
} = require('./infra/database/models');

interface ICradle {
  // System
  app: Application;
  server: Server;
  router: Router;
  logger: Logger;
  config: Config;

  // Middlewares
  // loggerMiddleware:
}

// const container = createContainer<ICradle>({
// injectionMode: InjectionMode.CLASSIC,
const container = createContainer({
  injectionMode: InjectionMode.PROXY,
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
    authenticationMiddleWare: asValue(auth0Middleware),
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
