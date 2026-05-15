<?php
declare(strict_types=1);

// BmiCalculator SDK utility: result_body

class BmiCalculatorResultBody
{
    public static function call(BmiCalculatorContext $ctx): ?BmiCalculatorResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
