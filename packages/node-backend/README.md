# Node backend

Node API based on [this boilerplate](https://github.com/talyssonoc/node-api-boilerplate).

## Quick start

1. Clone the repository with `git clone --depth=1 https://github.com/talyssonoc/node-api-boilerplate`
2. Setup the database on `config/database.ts` (there's an example file there to be used with PostgreSQL 😉 )
3. Install the dependencies with `yarn` (click here if [you don't have Yarn installed](https://yarnpkg.com/docs/install))
4. Create the development and test databases you have setup on `config/database.ts`
5. Run the database migrations with `npm run sequelize db:migrate`
6. Add some seed data to the development database with `npm run sequelize db:seed:all`
7. Run the application in development mode with `npm run dev`
8. Access `http://localhost:3000/api/users` and you're ready to go!

After playing a little bit with the boilerplate and _before_ implementing a real application with it I recommend you to read at least the `Setup` and the `Organization and architecture` sections of our [Wiki](https://github.com/talyssonoc/node-api-boilerplate/wiki). After that you'll be able to remove the example application files running `npm run cleanup`

## Aditional info:

- Don't forget to run the migrations for the test environment as well (including when you create a new migration) with `npm run sequelize db:migrate -- --env=test`

## Scripts

This boilerplate comes with a collection of npm scripts to make your life easier, you'll run them with `npm run <script name>` or `yarn run <script name>`:

- `dev`: Run the application in development mode
- `start`: Run the application in production mode (prefer not to do that in development) 
- `test`: Run the test suite
- `test:unit`: Run only the unit tests
- `test:features`: Run only the features tests
- `coverage`: Run only the unit tests and generate code coverage for them, the output will be on `coverage` folder
- `lint`: Lint the codebase
- `sequelize`: Alias to the [Sequelize CLI](https://github.com/sequelize/cli)
- `console`: Open the built-in console, you can access the DI container through the `container` variable once it's open, the console is promise-friendly. Click [here](https://github.com/talyssonoc/node-api-boilerplate/wiki/Application-console) to know more about the built-in console
- `cleanup`: Removes the files from the example application

## Tech

- [Node v7.6+](http://nodejs.org/)
- [Express](https://npmjs.com/package/express)
- [Sequelize](https://www.npmjs.com/package/sequelize)
- [Awilix](https://www.npmjs.com/package/awilix)
- [Structure](https://www.npmjs.com/package/structure)
- [HTTP Status](https://www.npmjs.com/package/http-status)
- [Log4js](https://www.npmjs.com/package/log4js)
- [Morgan](https://www.npmjs.com/package/morgan)
- [Express Status Monitor](https://www.npmjs.com/package/express-status-monitor)
- [Nodemon](https://www.npmjs.com/package/nodemon)
- [PM2](https://www.npmjs.com/package/pm2)
- [Mocha](https://www.npmjs.com/package/mocha)
- [Chai](https://www.npmjs.com/package/chai)
- [FactoryGirl](https://www.npmjs.com/package/factory-girl)
- [Istanbul](https://www.npmjs.com/package/istanbul) + [NYC](https://www.npmjs.com/package/nyc)
- [ESLint](https://www.npmjs.com/package/eslint)
