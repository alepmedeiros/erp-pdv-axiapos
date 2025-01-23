import type { Address } from "./Address";

export interface Payer {
    email: string;
    first_name?: string;
    last_name?: string;
    identification: Identification;
    address?: Address;
}

interface Identification {
    type: string;
    number: string;
}