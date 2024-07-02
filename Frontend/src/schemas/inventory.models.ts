export interface material {
    id: string;
    code: string;
    measurement: string;
    description: string;
    clientId: string;
    minAmount?: string;
    amount?: string;
    leftoverAmount: string;
}

export interface importMovement {
    import?: string;
    due?: string;
    materials?: any[];
}

export interface exportMovement {
    programation?: string;
    jobpo?: string;
    due?: string;
    materials?: any[];
}

export interface movement {
    id: string;
    programation?: string;
    jobpo?: string;
    import?: string;
    due: string;
    description: string;
    code: string;
    amount: string;
    realAmount: string;
    measurement: string;
    clientId: string;
    active: boolean;
    leftoverAmount: string;
}
