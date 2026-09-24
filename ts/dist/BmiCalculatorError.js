"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BmiCalculatorError = void 0;
class BmiCalculatorError extends Error {
    isBmiCalculatorError = true;
    sdk = 'BmiCalculator';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.BmiCalculatorError = BmiCalculatorError;
//# sourceMappingURL=BmiCalculatorError.js.map