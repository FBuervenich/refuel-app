var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://fbuervenich.eu.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://refuel-app--api-prod.herokuapp.com/api',
  issuer: 'https://fbuervenich.eu.auth0.com/',
  algorithms: ['RS256'],
});

const userIdExtractor = (req, res, next) => {
  res.locals.userId = req.user.sub;
  next();
};

module.exports = [jwtCheck, userIdExtractor];
