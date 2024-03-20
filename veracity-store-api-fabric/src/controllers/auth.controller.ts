import axios, { InternalAxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';

import { UserService } from '../../fabric-api/services/UserService'; // Import the UserService class

export const login = async (req: Request, res: Response): Promise<void> => {
    const requestBody = {
        id: req.body.username,
        secret: req.body.password,
    };

    try {
        // Get token from UserService
        const response = await UserService.getToken(requestBody);

        // Add token to headers
        axios.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                config.headers.setAuthorization(`Bearer ${response.token}`); // Explicitly cast to AxiosRequestHeaders
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        res.status(200).send(response.token);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
};
