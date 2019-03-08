import { Request, Response, NextFunction } from 'express';
import Boom from 'boom';

export default function _errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  // Handle body parser errors
  if (error instanceof SyntaxError) {
    const boomError = Boom.badRequest('The request body contains an invalid JSON string.');
    return res.status(boomError.output.statusCode).json(boomError.output.payload);
  }

  // Only log >=500 errors or when not in production
  if (!error.isBoom || error.isServer || process.env.NODE_ENV !== 'production') {
    console.error(error);
  }

  if (error.isBoom) {
    return res.status(error.output.statusCode).json(error.output.payload);
  }

  return res.status(500).send('Internal server error.');
}
