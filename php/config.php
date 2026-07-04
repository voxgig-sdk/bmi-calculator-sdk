<?php
declare(strict_types=1);

// BmiCalculator SDK configuration

class BmiCalculatorConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "BmiCalculator",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://bmicalculatorapi.vercel.app",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "bmi" => [],
                ],
            ],
            "entity" => [
        'bmi' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'bmi',
              'req' => true,
              'type' => '`$NUMBER`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'category',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'height',
              'req' => true,
              'type' => '`$NUMBER`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'weight',
              'req' => true,
              'type' => '`$NUMBER`',
              'index$' => 3,
            ],
          ],
          'name' => 'bmi',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'params' => [
                      [
                        'active' => true,
                        'example' => 1.75,
                        'kind' => 'param',
                        'name' => 'height',
                        'orig' => 'height',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                        'index$' => 0,
                      ],
                      [
                        'active' => true,
                        'example' => 87.9,
                        'kind' => 'param',
                        'name' => 'weight',
                        'orig' => 'weight',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                        'index$' => 1,
                      ],
                    ],
                  ],
                  'method' => 'GET',
                  'orig' => '/api/bmi/{weight}/{height}',
                  'parts' => [
                    'api',
                    'bmi',
                    '{weight}',
                    '{height}',
                  ],
                  'select' => [
                    'exist' => [
                      'height',
                      'weight',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.bmi`',
                  ],
                  'index$' => 0,
                ],
              ],
              'key$' => 'load',
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'bmi',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return BmiCalculatorFeatures::make_feature($name);
    }
}
