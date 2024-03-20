import { Request, Response } from 'express';

import { ChannelService } from '../../fabric-api/services/ChannelService';

export const listChecks = (req: Request, res: Response): void => {
    res.json([
        { id: 1, name: 'Check 1' },
        { id: 2, name: 'Check 2' },
    ]);
};

export const getCheck = (req: Request, res: Response): void => {
    const requestBody = {
        method: 'VeracityStoreContract:get',
        args: [req.params.id],
        transient: {},
    };
    const promise = ChannelService.invoke(
        'my-channel1',
        'chaincode1',
        requestBody
    );
    handleResponse(promise, res);
};

export const shareCheck = (req: Request, res: Response): void => {
    const requestBody = {
        method: 'VeracityStoreContract:put',
        args: [req.params.id, JSON.stringify(req.body.data)],
        transient: {},
    };
    const promise = ChannelService.invoke(
        'my-channel1',
        'chaincode1',
        requestBody
    );
    handleResponse(promise, res);
};

export const approveCheck = (req: Request, res: Response): void => {
    const id = req.params.id;
    res.json({ message: `Check with id ${id} approved/dissapproved` });
};

function handleResponse(promise: Promise<any>, res: Response) {
    promise
        .then((response) => {
            const data = JSON.parse(response.response.success);
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(400).json(error.body.message);
        });
}
