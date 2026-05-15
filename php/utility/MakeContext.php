<?php
declare(strict_types=1);

// BmiCalculator SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class BmiCalculatorMakeContext
{
    public static function call(array $ctxmap, ?BmiCalculatorContext $basectx): BmiCalculatorContext
    {
        return new BmiCalculatorContext($ctxmap, $basectx);
    }
}
