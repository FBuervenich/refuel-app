const { createContainer, asClass, asFunction, asValue } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const config = require('../config');
const Application = require('./app/Application');
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

const Server = require('./interfaces/http/Server');
const router = require('./interfaces/http/router');
const loggerMiddleware = require('./interfaces/http/logging/loggerMiddleware');
const errorHandler = require('./interfaces/http/errors/errorHandler');
const devErrorHandler = require('./interfaces/http/errors/devErrorHandler');
const swaggerMiddleware = require('./interfaces/http/swagger/swaggerMiddleware');

const logger = require('./infra/logging/logger');
const SequelizeUsersRepository = require('./infra/user/SequelizeUsersRepository');
const SequelizeRefuelingsRepository = require('./infra/refueling/SequelizeRefuelingsRepository');
const {
  database,
  UserModel,
  RefuelingModel,
} = require('./infra/database/models');

const container = createContainer();

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

module.exports = container;
