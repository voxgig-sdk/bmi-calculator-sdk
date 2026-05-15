-- ProjectName SDK exists test

local sdk = require("bmi-calculator_sdk")

describe("BmiCalculatorSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
