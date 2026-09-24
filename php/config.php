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
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
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
              'title' => 'Category',
              'type' => '`$STRING`',
              'req' => true,
              'short' => 'Health category based on BMI',
            ],
            [
              'name' => 'bmi',
              'title' => 'Bmi',
              'type' => '`$NUMBER`',
              'req' => true,
              'short' => 'Calculated BMI (trimmed to 3 decimal points)',
              'format' => 'float',
            ],
            [
              'name' => 'height',
              'title' => 'Height',
              'type' => '`$NUMBER`',
              'req' => true,
              'short' => 'Provided height in meters',
              'format' => 'float',
            ],
            [
              'name' => 'id',
              'title' => 'Id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'weight',
              'title' => 'Weight',
              'type' => '`$NUMBER`',
              'req' => true,
              'short' => 'Provided weight in kilograms',
              'format' => 'float',
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
                  'parts' => [
                    'api',
                    'bmi',
                    '{weight}',
                    '{height}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'params' => [
                      [
                        'name' => 'height',
                        'orig' => 'height',
                        'type' => '`$NUMBER`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 1.75,
                      ],
                      [
                        'name' => 'weight',
                        'orig' => 'weight',
                        'type' => '`$NUMBER`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => 87.9,
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'height',
                      'weight',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
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
