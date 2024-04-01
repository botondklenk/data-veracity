import { Request, Response } from 'express';

import { InvokeBody } from '../../fabric-api/models/InvokeBody';
import { ChannelService } from '../../fabric-api/services/ChannelService';
import { handleResponse, invoke } from '../utils/fabric';

export const listChecks = (req: Request, res: Response): void => {
    const requestBody: InvokeBody = {
        method: 'VeracityStoreContract:queryAllAssets',
        args: [],
        transient: {},
    };
    const promise = ChannelService.invoke(
        'my-channel1',
        'chaincode1',
        requestBody
    );
    handleResponse(promise, res);
};

export const getCheck = (req: Request, res: Response): void => {
    const checkId = req.params.checkId;
    const promise = invoke('get', [checkId]);
    handleResponse(promise, res);
};

export const shareCheck = (req: Request, res: Response): void => {
    const checkId = req.params.checkId;
    const consumer = req.params.organization;
    const providerResult = JSON.stringify(req.body.result);
    const promise = invoke('share', [checkId, consumer, providerResult]);
    handleResponse(promise, res);
};

export const verifyCheck = (req: Request, res: Response): void => {
    const checkId = req.params.checkId;
    const provider = req.params.organization;
    const consumerResult = JSON.stringify(req.body.result);
    const promise = invoke('verify', [
        checkId,
        provider,
        consumerResult,
    ]);
    handleResponse(promise, res);
};
