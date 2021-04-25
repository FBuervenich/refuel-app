const user = require('../../app/user');
const UserSerializer = require('../../interfaces/http/user/UserSerializer');

const userIdExtractor = (req, res, next) => {
  console.log('------------\n', req, '\n----------');
  console.log('------------\n', res, '\n----------');
  const userId = req.user.sub;
  res.locals.userId = userId;
  next();
};

module.exports = userIdExtractor;
