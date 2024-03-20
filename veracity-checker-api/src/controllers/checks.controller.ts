import Ajv from 'ajv';
import axios from 'axios';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

// Process data and config

type AggregateFunctions = 'mean' | 'min' | 'max';
type Relation = '<' | '<=' | '>' | '>=' | '==' | '!=';

type AggregatedValue = {
    property: string;
    aggregateFunction: AggregateFunctions;
};

type Rule = {
    x1: AggregatedValue;
    relation: Relation;
    x2: number | AggregatedValue;
};

type Config = {
    schema: object;
    rules: Rule[];
};

type DataItem = {
    [key: string]: any;
};

type Body = {
    data: DataItem[];
    config: Config;
};

// Process info

type Problem = {
    target: string;
    message: string;
};

type ProcessResult = {
    problems: Problem[];
    time: number;
};

type ProcessInfo = {
    status: string;
    result?: ProcessResult;
};

// Store the status and result of each process
const processes: { [id: string]: ProcessInfo } = {};

export const startCheck = (req: Request, res: Response): void => {
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
    checkVeracity(body.data, body.config).subscribe((result) => {
        process.status = 'Done';
        process.result = result;
        shareResult(processId, result);
    });
    res.send({ processId });
    console.log('Data veracity checking process started with id: ' + processId);
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

function applyRule(items: DataItem[], rule: Rule): boolean {
    // Check if rule.x1 is defined
    if (!rule.x1) {
        console.error('Invalid rule:', rule);
        return false;
    }

    // Extract the G3 values from the items
    const values = items.map(
        (item: { [key: string]: any }) => item[rule.x1.property]
    );

    // Define the aggregate functions
    const aggregateFunctions = {
        mean: (values: number[]) =>
            values.reduce((a, b) => a + b, 0) / values.length,
        min: (values: number[]) => Math.min(...values),
        max: (values: number[]) => Math.max(...values),
    };

    // Calculate the aggregate value
    const x1 = aggregateFunctions[rule.x1.aggregateFunction](values);

    let x2 = rule.x2;

    if (typeof x2 !== 'number') {
        x2 = aggregateFunctions[x2.aggregateFunction](values);
    }

    switch (rule.relation) {
        case '<':
            return x1 < x2;
        case '<=':
            return x1 <= x2;
        case '>':
            return x1 > x2;
        case '>=':
            return x1 >= x2;
        case '==':
            return x1 === x2;
        case '!=':
            return x1 !== x2;
    }
}

function shareResult(processId: string, result: ProcessResult) {
    const requestBody = {
        result: result,
    };
    axios
        .put(`http://localhost:3001/checks/${processId}?organization=example`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: requestBody,
        })
        .then((response) => {
            // handle success
            console.log(response.data);
        })
        .catch((e) => {
            // handle error
            console.log(e.response.data);
        });
}

function checkVeracity(
    data: DataItem[],
    config: Config
): Observable<ProcessResult> {
    // Implement your veracity checks here
    return new Observable((subscriber) => {
        const startTime = Date.now();
        const ajv = new Ajv();
        const validate = ajv.compile(config.schema);
        const problems: Problem[] = [];
        const valid = validate(data);
        if (!valid) {
            validate.errors?.forEach((error) => {
                problems.push({
                    target: error.instancePath,
                    message: error.message,
                });
            });
        }

        for (const rule of config.rules) {
            if (!applyRule(data, rule)) {
                problems.push({
                    target: `${rule.x1.property} ${rule.x1.aggregateFunction}`,
                    message: `'${rule.relation} ${rule.x2}' not satisfied`,
                });
            }
        }

        subscriber.next({ problems: problems, time: Date.now() - startTime });

        subscriber.complete();
    });
}
