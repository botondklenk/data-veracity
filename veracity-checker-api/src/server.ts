import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { connector } from 'swagger-routes-express';
import swaggerUi from 'swagger-ui-express';

import apiDefinition from '../docs/swagger.json';

import * as controllers from './controllers';

export const startServer = async () => {
    const app = express();
    const port = 3000;

    app.use(cors({ origin: true, credentials: true }));
    app.use(cookieParser());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    app.use((req, res, next) => {
        console.log(
            `${new Date().toISOString()} - ${req.method} ${req.originalUrl}`
        );
        next();
    });

    const connect = connector(controllers, apiDefinition);

    connect(app);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDefinition));

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};
