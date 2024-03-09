import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

type Body = {
    data: [];
    config: object;
};

type ProcessInfo = {
    status: string;
    result?: object;
};

// Store the status and result of each process
const processes: { [id: string]: ProcessInfo } = {};

export const processData = (req: Request, res: Response): void => {
    const body: Body = req.body;

    if (!body || !Array.isArray(body.data) || typeof body.config !== 'object') {
        res.status(400).send({
            error: 'Invalid body.',
        });
        return;
    }

    const processId = uuidv4();
    const process: ProcessInfo = { status: 'In progress' };
    processes[processId] = process;
    checkVeracity(body.data).subscribe((result) => {
        process.status = 'Done';
        process.result = result;
    });
    res.send({ processId });
    console.log('Data veracity process started with id: ' + processId);
};

export const getProcessInfo = (req: Request, res: Response): void => {
    const processId = req.params.id;
    const process = processes[processId];
    if (process) {
        res.send(process);
        if (process.status === 'Done') {
            // maybe the result should be saved to a database
            delete processes[processId];
        }
    } else {
        res.status(404).send({ error: 'Process not found' });
    }
};

function checkVeracity(data: []): Observable<object> {
    // Implement your veracity checks here
    return new Observable((subscriber) => {
        setTimeout(() => {
            const length = data.length;
            console.log(`Array length: ${length}`);
            subscriber.next({ lenght: length });
            subscriber.complete();
        }, 15000);
    });
}
