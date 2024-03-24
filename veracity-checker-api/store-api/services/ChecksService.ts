/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChecksService {
    /**
     * List shared results
     * Lists the shared results of an organization
     * @param organization
     * @returns any Successful operation
     * @throws ApiError
     */
    public static listChecks(
        organization: string,
    ): CancelablePromise<Array<Record<string, any>>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/checks',
            query: {
                'organization': organization,
            },
            errors: {
                400: `Invalid input`,
            },
        });
    }
    /**
     * Get a shared result
     * Gets a shared result from a partner organization by id
     * @param id
     * @param organization
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getCheck(
        id: string,
        organization: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/checks/{organization}/{id}',
            path: {
                'id': id,
                'organization': organization,
            },
            errors: {
                400: `Invalid input`,
            },
        });
    }
    /**
     * Share a veracity check result
     * Shares a veracity check result with a specified organization
     * @param id
     * @param organization
     * @param requestBody
     * @returns any Successfully created
     * @throws ApiError
     */
    public static shareCheck(
        id: string,
        organization: string,
        requestBody: {
            result?: Record<string, any>;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/checks/{organization}/{id}',
            path: {
                'id': id,
                'organization': organization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }
    /**
     * Approve or disapprove a result
     * Approves or disapproves a shared check result
     * @param id
     * @param organization
     * @param requestBody
     * @returns any Successful operation
     * @throws ApiError
     */
    public static approveCheck(
        id: string,
        organization: string,
        requestBody: {
            approved?: boolean;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/checks/{organization}/{id}',
            path: {
                'id': id,
                'organization': organization,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }
}
