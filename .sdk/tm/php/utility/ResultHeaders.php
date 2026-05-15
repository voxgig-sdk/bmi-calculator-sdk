<?php
declare(strict_types=1);

// BmiCalculator SDK utility: result_headers

class BmiCalculatorResultHeaders
{
    public static function call(BmiCalculatorContext $ctx): ?BmiCalculatorResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
