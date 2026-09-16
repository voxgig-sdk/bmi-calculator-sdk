# BmiCalculator SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module BmiCalculatorFeatures
  def self.make_feature(name)
    case name
    when "base"
      BmiCalculatorBaseFeature.new
    when "ratelimit"
      BmiCalculatorRatelimitFeature.new
    when "retry"
      BmiCalculatorRetryFeature.new
    when "test"
      BmiCalculatorTestFeature.new
    when "timeout"
      BmiCalculatorTimeoutFeature.new
    else
      BmiCalculatorBaseFeature.new
    end
  end
end
