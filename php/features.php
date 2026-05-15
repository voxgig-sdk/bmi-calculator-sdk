<?php
declare(strict_types=1);

// BmiCalculator SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class BmiCalculatorFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new BmiCalculatorBaseFeature();
            case "test":
                return new BmiCalculatorTestFeature();
            default:
                return new BmiCalculatorBaseFeature();
        }
    }
}
