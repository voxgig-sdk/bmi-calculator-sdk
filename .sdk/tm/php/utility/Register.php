<?php
declare(strict_types=1);

// BmiCalculator SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

BmiCalculatorUtility::setRegistrar(function (BmiCalculatorUtility $u): void {
    $u->clean = [BmiCalculatorClean::class, 'call'];
    $u->done = [BmiCalculatorDone::class, 'call'];
    $u->make_error = [BmiCalculatorMakeError::class, 'call'];
    $u->feature_add = [BmiCalculatorFeatureAdd::class, 'call'];
    $u->feature_hook = [BmiCalculatorFeatureHook::class, 'call'];
    $u->feature_init = [BmiCalculatorFeatureInit::class, 'call'];
    $u->fetcher = [BmiCalculatorFetcher::class, 'call'];
    $u->make_fetch_def = [BmiCalculatorMakeFetchDef::class, 'call'];
    $u->make_context = [BmiCalculatorMakeContext::class, 'call'];
    $u->make_options = [BmiCalculatorMakeOptions::class, 'call'];
    $u->make_request = [BmiCalculatorMakeRequest::class, 'call'];
    $u->make_response = [BmiCalculatorMakeResponse::class, 'call'];
    $u->make_result = [BmiCalculatorMakeResult::class, 'call'];
    $u->make_point = [BmiCalculatorMakePoint::class, 'call'];
    $u->make_spec = [BmiCalculatorMakeSpec::class, 'call'];
    $u->make_url = [BmiCalculatorMakeUrl::class, 'call'];
    $u->param = [BmiCalculatorParam::class, 'call'];
    $u->prepare_auth = [BmiCalculatorPrepareAuth::class, 'call'];
    $u->prepare_body = [BmiCalculatorPrepareBody::class, 'call'];
    $u->prepare_headers = [BmiCalculatorPrepareHeaders::class, 'call'];
    $u->prepare_method = [BmiCalculatorPrepareMethod::class, 'call'];
    $u->prepare_params = [BmiCalculatorPrepareParams::class, 'call'];
    $u->prepare_path = [BmiCalculatorPreparePath::class, 'call'];
    $u->prepare_query = [BmiCalculatorPrepareQuery::class, 'call'];
    $u->result_basic = [BmiCalculatorResultBasic::class, 'call'];
    $u->result_body = [BmiCalculatorResultBody::class, 'call'];
    $u->result_headers = [BmiCalculatorResultHeaders::class, 'call'];
    $u->transform_request = [BmiCalculatorTransformRequest::class, 'call'];
    $u->transform_response = [BmiCalculatorTransformResponse::class, 'call'];
});
