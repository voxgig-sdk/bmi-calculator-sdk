# BmiCalculator SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module BmiCalculatorFeatures
  def self.make_feature(name)
    case name
    when "base"
      BmiCalculatorBaseFeature.new
    when "test"
      BmiCalculatorTestFeature.new
    else
      BmiCalculatorBaseFeature.new
    end
  end
end
