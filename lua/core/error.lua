-- BmiCalculator SDK error

local BmiCalculatorError = {}
BmiCalculatorError.__index = BmiCalculatorError


function BmiCalculatorError.new(code, msg, ctx)
  local self = setmetatable({}, BmiCalculatorError)
  self.is_sdk_error = true
  self.sdk = "BmiCalculator"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function BmiCalculatorError:error()
  return self.msg
end


function BmiCalculatorError:__tostring()
  return self.msg
end


return BmiCalculatorError
