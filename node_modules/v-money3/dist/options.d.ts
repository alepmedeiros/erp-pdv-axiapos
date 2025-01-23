export interface VMoneyOptions {
    debug: boolean;
    masked: boolean;
    prefix: string;
    suffix: string;
    thousands: string;
    decimal: string;
    precision: number;
    disableNegative: boolean;
    disabled: boolean;
    min: number | string | null;
    max: number | string | null;
    allowBlank: boolean;
    minimumNumberOfCharacters: number;
    modelModifiers: any;
    shouldRound: boolean;
    focusOnRight: boolean;
    [key: string]: any;
}
declare const _default: VMoneyOptions;
export default _default;
