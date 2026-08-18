-- BmiCalculator SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "BmiCalculator",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://bmicalculatorapi.vercel.app",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["bmi"] = {},
      },
    },
    entity = {
      ["bmi"] = {
        ["fields"] = {
          {
            ["name"] = "Category",
            ["req"] = true,
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "bmi",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "height",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "weight",
            ["req"] = true,
            ["type"] = "`$NUMBER`",
          },
        },
        ["name"] = "bmi",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["params"] = {
                    {
                      ["example"] = 1.75,
                      ["kind"] = "param",
                      ["name"] = "height",
                      ["orig"] = "height",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = 87.9,
                      ["kind"] = "param",
                      ["name"] = "weight",
                      ["orig"] = "weight",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/bmi/{weight}/{height}",
                ["parts"] = {
                  "api",
                  "bmi",
                  "{weight}",
                  "{height}",
                },
                ["select"] = {
                  ["exist"] = {
                    "height",
                    "weight",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "bmi",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
