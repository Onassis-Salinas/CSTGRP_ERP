export type device = {
    id?: string;
    name?: string;
    ip?: string;
    user?: string;
    password?: string;
    wifipw?: string;
};

export type computer = {
    id?: string;
    employeeId?: string;
    anydesk?: string;
    active?: boolean;
    lastMaintance?: string;
    password?: string;
};

export type email = {
    id?: string;
    email?: string;
    employeeId?: string;
    password?: string;
};
