# BmiCalculator SDK utility: make_context
require_relative '../core/context'
module BmiCalculatorUtilities
  MakeContext = ->(ctxmap, basectx) {
    BmiCalculatorContext.new(ctxmap, basectx)
  }
end
