import { RequestHandler, Router } from 'express';

export type RestController = {
  router: Router;
} & {
  [key: string]: RequestHandler;
};
