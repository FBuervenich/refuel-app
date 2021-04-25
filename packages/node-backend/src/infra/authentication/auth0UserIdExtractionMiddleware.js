const user = require('../../app/user');
const UserSerializer = require('../../interfaces/http/user/UserSerializer');

const userIdExtractor = (req, res, next) => {
  console.log('------------\n', req, '\n----------');
  console.log('------------\n', res, '\n----------');
  res.locals.userId = res.locals.user.sub;
  next();
};

module.exports = userIdExtractor;
