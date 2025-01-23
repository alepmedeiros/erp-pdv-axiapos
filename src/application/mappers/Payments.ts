import type { Payer } from "./Payer";

export interface Payments {
    transaction_amount: number;
    token?: string;
    description: string;
    installments?: number;
    payment_method_id: string;
    issuer_id?: number;
    payer: Payer;
}