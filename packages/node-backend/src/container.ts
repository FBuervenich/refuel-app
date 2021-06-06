import {
  createContainer,
  asClass,
  asFunction,
  asValue,
  InjectionMode,
  BuildResolver,
  DisposableResolver,
} from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { ErrorRequestHandler, RequestHandler, Router } from 'express';
import { Logger } from 'log4js';

import config from '../config';
import { Config } from '../config';

import { infraErrorFactory } from './app/utils/errors/utils';

import Application from './app/Application';
import {
  CreateUser,
  GetAllUsers,
  GetUser,
  UpdateUser,
  DeleteUser,
} from './app/user';

import {
  CreateRefueling,
  GetAllRefuelings,
  GetRefueling,
  UpdateRefueling,
  DeleteRefueling,
} from './app/refueling';

import UserSerializer from './interfaces/http/user/UserSerializer';
import RefuelingSerializer from './interfaces/http/refueling/RefuelingSerializer';

import Server from './interfaces/http/Server';
import router from './interfaces/http/router';
import loggerMiddleware from './interfaces/http/logging/loggerMiddleware';
import errorHandler from './interfaces/http/errors/errorHandler';
import devErrorHandler from './interfaces/http/errors/devErrorHandler';
import swaggerMiddleware from './interfaces/http/swagger/swaggerMiddleware';

import logger from './infra/logging/logger';
import auth0Middlewares from './interfaces/http/authentication/auth0Middlewares';
import SequelizeUsersRepository from './infra/user/SequelizeUsersRepository';

import SequelizeRefuelingsRepository from './infra/refueling/SequelizeRefuelingsRepository';

import { database, SequelizeModels } from './infra/database/models';
import { Model, Sequelize } from 'sequelize/types';
import { RefuelingModelType } from './infra/database/models/Refueling';

// TODO refine to be more type safe
const UserModel = SequelizeModels.User;
const RefuelingModel = SequelizeModels.Refueling;

export interface ICradle {
  // System
  app: Application;
  server: Server;
  router: Router;
  logger: Logger;
  config: Config;
  infraErrorFactory: ReturnType<typeof infraErrorFactory>;

  // Middlewares
  loggerMiddleware: ReturnType<typeof loggerMiddleware>;
  authenticationMiddlewares: RequestHandler[];
  containerMiddleware: RequestHandler;
  errorHandler: ErrorRequestHandler;
  swaggerMiddleware: RequestHandler[];

  // Repositories
  usersRepository: InstanceType<typeof SequelizeUsersRepository>;
  refuelingsRepository: InstanceType<typeof SequelizeRefuelingsRepository>;

  // Database
  database: Sequelize;
  UserModel: Model;
  RefuelingModel: RefuelingModelType;

  // Operations
  createUser: InstanceType<typeof CreateUser>;
  getAllUsers: InstanceType<typeof GetAllUsers>;
  getUser: InstanceType<typeof GetUser>;
  updateUser: InstanceType<typeof UpdateUser>;
  deleteUser: InstanceType<typeof DeleteUser>;

  createRefueling: InstanceType<typeof CreateRefueling>;
  getAllRefuelings: InstanceType<typeof GetAllRefuelings>;
  getRefueling: InstanceType<typeof GetRefueling>;
  updateRefueling: InstanceType<typeof UpdateRefueling>;
  deleteRefueling: InstanceType<typeof DeleteRefueling>;

  // Serializers
  userSerializer: typeof UserSerializer;
  refuelingSerializer: typeof RefuelingSerializer;
}

const container = createContainer<ICradle>({
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
  })
  .register({
    infraErrorFactory: asFunction(infraErrorFactory),
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
    swaggerMiddleware: asValue(swaggerMiddleware),
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

// TODO consider using awilix auto-loading
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
