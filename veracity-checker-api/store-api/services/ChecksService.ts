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
     * @param checkId
     * @param organization
     * @returns any Successful operation
     * @throws ApiError
     */
    public static getCheck(
        checkId: string,
        organization: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/checks/{organization}/{checkId}',
            path: {
                'checkId': checkId,
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
     * @param checkId
     * @param organization
     * @param requestBody
     * @returns any Successfully created
     * @throws ApiError
     */
    public static shareCheck(
        checkId: string,
        organization: string,
        requestBody: {
            result?: Record<string, any>;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/checks/{organization}/{checkId}',
            path: {
                'checkId': checkId,
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
     * Verify a veracity check result
     * Shares a veracity check result with a specified organization, and verifies it
     * @param checkId
     * @param organization
     * @param requestBody
     * @returns any Successful operation
     * @throws ApiError
     */
    public static verifyCheck(
        checkId: string,
        organization: string,
        requestBody: {
            result?: Record<string, any>;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/checks/{organization}/{checkId}',
            path: {
                'checkId': checkId,
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
