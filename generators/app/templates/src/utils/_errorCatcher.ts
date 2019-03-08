import { Request, Response, NextFunction } from 'express';
import Boom from 'boom';

// Catch all errors that happen in the routes.
// Pass the error to the general express error handler.
// Neccesary because Express does not catch errors thrown in async functions by default
export default function _errorCatcher(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      if (!error.isBoom) {
        next(Boom.badImplementation(error));
      } else {
        next(error);
      }
    });
  };
}
