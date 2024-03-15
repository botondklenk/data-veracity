import { writeFile } from 'fs';
import { IncomingMessage, Server, ServerResponse } from 'http';
import path from 'path';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { setup, serve } from 'swagger-ui-express';

import { OpenAPIOption } from '../openapi-options';

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
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    // Setup Swagger JSDoc
    const specs = swaggerJSDoc(OpenAPIOption);

    writeFile(
        path.join(__dirname, '../docs/swagger.json'),
        JSON.stringify(specs, null, 2),
        (err) => {
            if (err) console.log({ message: err.message, location: err.stack });
        }
    );

    app.use((req, res, next) => {
        console.log(
            `${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
        );
        next();
    });

    app.use('/docs', serve, setup(specs));

    app.use('/veracity', veracityRouter);

    const server = app.listen(port, () => {
        console.log(`App is running at http://localhost:${port}`);
    });

    return { app, server } as AppServer;
};
