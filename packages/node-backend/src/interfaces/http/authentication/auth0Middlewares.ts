import { NextFunction, Request, Response } from 'express';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

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

const userIdExtractor = (req: Request, res: Response, next: NextFunction) => {
  res.callingUserId = req.user.sub;
  next();
};

const middlewares = [jwtCheck, userIdExtractor];
export default middlewares;
