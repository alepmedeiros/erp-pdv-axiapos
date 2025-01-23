declare const _default: import("vue").DefineComponent<{
    debug: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    id: {
        required: false;
        type: (NumberConstructor | StringConstructor)[];
        default: () => number | null;
    };
    modelValue: {
        required: true;
        type: (NumberConstructor | StringConstructor)[];
    };
    modelModifiers: {
        required: false;
        type: ObjectConstructor;
        default: () => {
            number: boolean;
        };
    };
    masked: {
        type: BooleanConstructor;
        default: boolean;
    };
    precision: {
        type: NumberConstructor;
        default: () => number;
    };
    decimal: {
        type: StringConstructor;
        default: () => string;
        validator(value: string): boolean;
    };
    thousands: {
        type: StringConstructor;
        default: () => string;
        validator(value: string): boolean;
    };
    prefix: {
        type: StringConstructor;
        default: () => string;
        validator(value: string): boolean;
    };
    suffix: {
        type: StringConstructor;
        default: () => string;
        validator(value: string): boolean;
    };
    disableNegative: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: () => string | number | null;
    };
    min: {
        type: (NumberConstructor | StringConstructor)[];
        default: () => string | number | null;
    };
    allowBlank: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    minimumNumberOfCharacters: {
        type: NumberConstructor;
        default: () => number;
    };
    shouldRound: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    focusOnRight: {
        type: BooleanConstructor;
        default: () => boolean;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:model-value": (value: string | number) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    debug: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    id: {
        required: false;
        type: (NumberConstructor | StringConstructor)[];
        default: () => number | null;
    };
    modelValue: {
        required: true;
        type: (NumberConstructor | StringConstructor)[];
    };
    modelModifiers: {
        required: false;
        type: ObjectConstructor;
        default: () => {
            number: boolean;
        };
    };
    masked: {
        type: BooleanConstructor;
        default: boolean;
    };
    precision: {
        type: NumberConstructor;
        default: () => number;
    };
    decimal: {
        type: StringConstructor;
        default: () => string;
        validator(value: string): boolean;
    };
    thousands: {
        type: StringConstructor;
        default: () => string;
        validator(value: string): boolean;
    };
    prefix: {
        type: StringConstructor;
        default: () => string;
        validator(value: string): boolean;
    };
    suffix: {
        type: StringConstructor;
        default: () => string;
        validator(value: string): boolean;
    };
    disableNegative: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: () => string | number | null;
    };
    min: {
        type: (NumberConstructor | StringConstructor)[];
        default: () => string | number | null;
    };
    allowBlank: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    minimumNumberOfCharacters: {
        type: NumberConstructor;
        default: () => number;
    };
    shouldRound: {
        type: BooleanConstructor;
        default: () => boolean;
    };
    focusOnRight: {
        type: BooleanConstructor;
        default: () => boolean;
    };
}>> & {
    "onUpdate:model-value"?: ((value: string | number) => any) | undefined;
}, {
    debug: boolean;
    masked: boolean;
    prefix: string;
    suffix: string;
    thousands: string;
    decimal: string;
    precision: number;
    disableNegative: boolean;
    disabled: boolean;
    min: string | number;
    max: string | number;
    allowBlank: boolean;
    minimumNumberOfCharacters: number;
    modelModifiers: Record<string, any>;
    shouldRound: boolean;
    focusOnRight: boolean;
    id: string | number;
}>;
export default _default;
