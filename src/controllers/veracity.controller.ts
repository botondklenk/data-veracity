import { NextFunction, Request, Response } from 'express';

export const status = (req: Request, res: Response, next: NextFunction): void => {
  res.send('Hello from the data veracity checker component!');
};