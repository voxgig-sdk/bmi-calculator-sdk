<?php
declare(strict_types=1);

// BmiCalculator SDK configuration

class BmiCalculatorConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "BmiCalculator",
                "slug" => "bmi-calculator",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
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
              'name' => 'Category',
              'req' => true,
              'short' => 'Health category based on BMI',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'float',
              'name' => 'bmi',
              'req' => true,
              'short' => 'Calculated BMI (trimmed to 3 decimal points)',
              'type' => '`$NUMBER`',
            ],
            [
              'format' => 'float',
              'name' => 'height',
              'req' => true,
              'short' => 'Provided height in meters',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'format' => 'float',
              'name' => 'weight',
              'req' => true,
              'short' => 'Provided weight in kilograms',
              'type' => '`$NUMBER`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'from' => [
              'height' => 'height',
              'weight' => 'weight',
            ],
            'name' => 'id',
            'parts' => [
              'weight',
              'height',
            ],
            'sep' => '/',
          ],
          'name' => 'bmi',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 1.75,
                        'kind' => 'param',
                        'name' => 'height',
                        'orig' => 'height',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 87.9,
                        'kind' => 'param',
                        'name' => 'weight',
                        'orig' => 'weight',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/bmi/{weight}/{height}',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'bmi',
                    ],
                    [
                      'var' => 'weight',
                    ],
                    [
                      'var' => 'height',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'height',
                      'weight',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'bmi',
                    '{weight}',
                    '{height}',
                  ],
                ],
              ],
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
