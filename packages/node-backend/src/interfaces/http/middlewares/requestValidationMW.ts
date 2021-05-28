import { Request, Response, NextFunction } from 'express';

type TypeGuardType<T> = (x: any) => boolean;

export const requestValidationMWFactory = <T>(
  requestBodyValidator: (x: any) => x is T
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
};
