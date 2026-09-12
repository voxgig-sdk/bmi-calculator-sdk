import { BmiCalculatorEntityBase } from '../BmiCalculatorEntityBase';
import type { BmiCalculatorSDK } from '../BmiCalculatorSDK';
import type { Control } from '../types';
import type { Bmi, BmiLoadMatch } from '../BmiCalculatorTypes';
declare class BmiEntity extends BmiCalculatorEntityBase<Bmi> {
    constructor(client: BmiCalculatorSDK, entopts: any);
    make(this: BmiEntity): BmiEntity;
    load(this: any, reqmatch?: BmiLoadMatch, ctrl?: Control): Promise<BmiEntity>;
}
export { BmiEntity };
