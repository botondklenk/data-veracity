/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FactsService {
    /**
     * List facts
     * Lists the facts of all the checks that have been uploaded
     * @returns any Successful operation
     * @throws ApiError
     */
    public static listFacts(): CancelablePromise<Array<Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/facts',
            errors: {
                400: `Invalid input`,
            },
        });
    }
}
