
import { Context } from './Context'


class BmiCalculatorError extends Error {

  isBmiCalculatorError = true

  sdk = 'BmiCalculator'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  BmiCalculatorError
}

