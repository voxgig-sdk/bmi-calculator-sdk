# BmiCalculator SDK utility: prepare_body
module BmiCalculatorUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
