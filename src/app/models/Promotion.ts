export interface Promotion {
    code: string;
    date: {creation: Date, expiration: Date};
    description: string;
}
