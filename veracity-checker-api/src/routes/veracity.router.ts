import { Router } from 'express';

import {
    processData,
    getProcessInfo,
} from '../controllers/checks.controller';

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
 *     summary: Start processing data
 *     tags: [Veracity]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 items:
 *                   type: object
 *               config:
 *                 type: object
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
 *       '400':
 *         description: Invalid body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
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
