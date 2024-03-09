import { Router } from 'express';

import {
    processData,
    getProcessInfo,
} from '../controllers/veracity.controller';

const r: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Veracity
 *   description: Veracity routes
 */

/**
 * @swagger
 * /veracity/process:
 *   post:
 *     summary: start processing data
 *     tags: [Veracity]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *            type: array
 *            items:
 *              type: object
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 processId:
 *                   type: string
 */
r.post('/process', processData);

/**
 * @swagger
 * /veracity/process/{id}:
 *   get:
 *     summary: get process info
 *     tags: [Veracity]
 *     parameters:
 *       - name: id
 *         description: Process ID
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 result:
 *                   type: object
 */
r.get('/process/:id', getProcessInfo);

export default r;
