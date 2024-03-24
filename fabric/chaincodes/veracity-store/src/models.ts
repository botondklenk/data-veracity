export type CheckStatus = 'shared' | 'approved' | 'mismatched';

export interface VeracityCheck {
    providerResult: object;
    consumerResult: object;
    status: CheckStatus;
    contractId: string;
}

export interface VeracityCheckProof {
    status: CheckStatus;
    contractId: string;
}