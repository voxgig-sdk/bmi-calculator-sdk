import { Context } from './Context';
declare class BmiCalculatorError extends Error {
    isBmiCalculatorError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { BmiCalculatorError };
