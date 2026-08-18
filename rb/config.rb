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
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
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
              "type" => "`$STRING`",
            },
            {
              "name" => "bmi",
              "req" => true,
              "type" => "`$NUMBER`",
            },
            {
              "name" => "height",
              "req" => true,
              "type" => "`$NUMBER`",
            },
            {
              "name" => "weight",
              "req" => true,
              "type" => "`$NUMBER`",
            },
          ],
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
                  "parts" => [
                    "api",
                    "bmi",
                    "{weight}",
                    "{height}",
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
