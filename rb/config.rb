# BmiCalculator SDK configuration

module BmiCalculatorConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "BmiCalculator",
        "slug" => "bmi-calculator",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://bmicalculatorapi.vercel.app",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "bmi" => {},
        },
      },
      "entity" => {
        "bmi" => {
          "fields" => [
            {
              "name" => "Category",
              "req" => true,
              "short" => "Health category based on BMI",
              "type" => "`$STRING`",
            },
            {
              "format" => "float",
              "name" => "bmi",
              "req" => true,
              "short" => "Calculated BMI (trimmed to 3 decimal points)",
              "type" => "`$NUMBER`",
            },
            {
              "format" => "float",
              "name" => "height",
              "req" => true,
              "short" => "Provided height in meters",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "format" => "float",
              "name" => "weight",
              "req" => true,
              "short" => "Provided weight in kilograms",
              "type" => "`$NUMBER`",
            },
          ],
          "id" => {
            "field" => "id",
            "from" => {
              "height" => "height",
              "weight" => "weight",
            },
            "name" => "id",
            "parts" => [
              "weight",
              "height",
            ],
            "sep" => "/",
          },
          "name" => "bmi",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => 1.75,
                        "kind" => "param",
                        "name" => "height",
                        "orig" => "height",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => 87.9,
                        "kind" => "param",
                        "name" => "weight",
                        "orig" => "weight",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/bmi/{weight}/{height}",
                  "segments" => [
                    {
                      "lit" => "api",
                    },
                    {
                      "lit" => "bmi",
                    },
                    {
                      "var" => "weight",
                    },
                    {
                      "var" => "height",
                    },
                  ],
                  "select" => {
                    "exist" => [
                      "height",
                      "weight",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "parts" => [
                    "api",
                    "bmi",
                    "{weight}",
                    "{height}",
                  ],
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "bmi",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    BmiCalculatorFeatures.make_feature(name)
  end
end
