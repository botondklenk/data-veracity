import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { IncomingMessage, Server, ServerResponse } from 'http';
import veracityRouter from './routes/veracity.router';

export type AppServer = {
  app: express.Application;
  server: Server<typeof IncomingMessage, typeof ServerResponse>;
};

export const startServer = async () => {
  const app = express();
  const port = 3000;

  app.use(cors({ origin: true, credentials: true }));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/veracity', veracityRouter);

  const server = app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
  });

  return { app, server } as AppServer;
}

