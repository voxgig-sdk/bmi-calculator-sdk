<?php
declare(strict_types=1);

// BmiCalculator SDK utility: prepare_body

class BmiCalculatorPrepareBody
{
    public static function call(BmiCalculatorContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
