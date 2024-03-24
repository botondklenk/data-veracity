import { Response } from 'express';

import { InvokeBody, ChannelService } from '../../fabric-api';

const config: InvokeConfig = {
    contractName: 'VeracityStoreContract',
    channel: 'my-channel1',
    chaincode: 'chaincode1',
};

interface InvokeConfig {
    contractName: string;
    channel: string;
    chaincode: string;
}

export type InvokeResponse = {
    response: { error: string } | { success: object };
};
export type InvokeMethod = 'get' | 'share' | 'approve';

export async function invoke(
    method: InvokeMethod,
    args: string[]
): Promise<InvokeResponse> {
    const requestBody: InvokeBody = {
        method: `${config.contractName}:${method}`,
        args: args,
        transient: {},
    };
    return ChannelService.invoke(config.channel, config.chaincode, requestBody);
}

export function handleResponse(
    promise: Promise<InvokeResponse>,
    res: Response
) {
    promise
        .then((result) => {
            const response = result.response;
            console.log(result);
            if ('error' in response) {
                res.status(404).json(response);
            } else if ('success' in response) {
                res.status(200).json(response.success);
            }
        })
        .catch((error) => {
            res.status(400).json(error);
        });
}
