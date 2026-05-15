# BmiCalculator SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

BmiCalculatorUtility.registrar = ->(u) {
  u.clean = BmiCalculatorUtilities::Clean
  u.done = BmiCalculatorUtilities::Done
  u.make_error = BmiCalculatorUtilities::MakeError
  u.feature_add = BmiCalculatorUtilities::FeatureAdd
  u.feature_hook = BmiCalculatorUtilities::FeatureHook
  u.feature_init = BmiCalculatorUtilities::FeatureInit
  u.fetcher = BmiCalculatorUtilities::Fetcher
  u.make_fetch_def = BmiCalculatorUtilities::MakeFetchDef
  u.make_context = BmiCalculatorUtilities::MakeContext
  u.make_options = BmiCalculatorUtilities::MakeOptions
  u.make_request = BmiCalculatorUtilities::MakeRequest
  u.make_response = BmiCalculatorUtilities::MakeResponse
  u.make_result = BmiCalculatorUtilities::MakeResult
  u.make_point = BmiCalculatorUtilities::MakePoint
  u.make_spec = BmiCalculatorUtilities::MakeSpec
  u.make_url = BmiCalculatorUtilities::MakeUrl
  u.param = BmiCalculatorUtilities::Param
  u.prepare_auth = BmiCalculatorUtilities::PrepareAuth
  u.prepare_body = BmiCalculatorUtilities::PrepareBody
  u.prepare_headers = BmiCalculatorUtilities::PrepareHeaders
  u.prepare_method = BmiCalculatorUtilities::PrepareMethod
  u.prepare_params = BmiCalculatorUtilities::PrepareParams
  u.prepare_path = BmiCalculatorUtilities::PreparePath
  u.prepare_query = BmiCalculatorUtilities::PrepareQuery
  u.result_basic = BmiCalculatorUtilities::ResultBasic
  u.result_body = BmiCalculatorUtilities::ResultBody
  u.result_headers = BmiCalculatorUtilities::ResultHeaders
  u.transform_request = BmiCalculatorUtilities::TransformRequest
  u.transform_response = BmiCalculatorUtilities::TransformResponse
}
