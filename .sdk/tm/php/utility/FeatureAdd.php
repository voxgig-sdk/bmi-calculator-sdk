<?php
declare(strict_types=1);

// BmiCalculator SDK utility: feature_add

class BmiCalculatorFeatureAdd
{
    public static function call(BmiCalculatorContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
