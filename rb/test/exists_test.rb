# BmiCalculator SDK exists test

require "minitest/autorun"
require_relative "../BmiCalculator_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = BmiCalculatorSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
