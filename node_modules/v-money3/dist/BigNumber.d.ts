type NumberParam = bigint | number | string;
export default class BigNumber {
    protected number: bigint;
    protected decimal: number;
    constructor(number: NumberParam);
    getNumber(): bigint;
    getDecimalPrecision(): number;
    setNumber(number: NumberParam): void;
    toFixed(precision?: number, shouldRound?: boolean): string;
    toString(): string;
    lessThan(thatBigNumber: NumberParam | BigNumber): boolean;
    biggerThan(thatBigNumber: NumberParam | BigNumber): boolean;
    isEqual(thatBigNumber: NumberParam | BigNumber): boolean;
    setupString(number: string): void;
    adjustComparisonNumbers(thatNumberParam: NumberParam | BigNumber): bigint[];
}
export {};
