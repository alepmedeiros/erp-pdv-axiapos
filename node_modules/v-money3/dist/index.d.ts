import { App } from 'vue';
import Money3Component from './component.vue';
import Money3Directive from './directive';
import format from './format';
import { VMoneyOptions } from './options';
import unformat from './unformat';
import BigNumber from './BigNumber';
declare const _default: {
    install(app: App): void;
};
export default _default;
export type { VMoneyOptions, };
export { Money3Component, Money3Directive, format, unformat, BigNumber, Money3Component as Money3, Money3Directive as VMoney3, Money3Component as Money, Money3Directive as VMoney, };
