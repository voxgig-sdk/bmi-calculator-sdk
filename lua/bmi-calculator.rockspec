package = "voxgig-sdk-bmi-calculator"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/bmi-calculator-sdk.git"
}
description = {
  summary = "BmiCalculator SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["bmi-calculator_sdk"] = "bmi-calculator_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
