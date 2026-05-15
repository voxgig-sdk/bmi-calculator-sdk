<?php
declare(strict_types=1);

// BmiCalculator SDK exists test

require_once __DIR__ . '/../bmicalculator_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = BmiCalculatorSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
