import axios from 'axios';
import { Request, Response } from 'express';

type Problem = {
    target: string;
    message: string;
};

type ProcessResult = {
    problems: Problem[];
    time: number;
};

export const listChecks = (req: Request, res: Response): void => {
    res.json([
        { id: 1, name: 'Check 1' },
        { id: 2, name: 'Check 2' },
    ]);
};

export const getCheck = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.json({ id, name: 'Check 1' });
};

export const shareCheck = (req: Request, res: Response): void => {
    const id = req.params.id;
    const checkResult = req.body.data;
    storeResult(id, checkResult);
    // TODO only set res status to 201 if the result was stored successfully
    res.status(201).json({ message: 'Check result stored' });
};

export const approveCheck = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.json({ message: `Check with id ${id} approved/dissapproved` });
};

function storeResult(processId: string, result: ProcessResult) {
    const requestBody = {
        method: 'VeracityStoreContract:put',
        args: [processId, JSON.stringify(result)],
        transient: {},
    };
    axios
        .post(
            'http://localhost:8801/invoke/my-channel1/chaincode1',
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer 7355e680-e55e-11ee-8198-018fac0a5072-admin',
                },
            }
        )
        .then((response) => {
            // handle success
            console.log(response.data);
        })
        .catch((e) => {
            // handle error
            console.log(e.data);
        });
}
