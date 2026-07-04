-- Typed models for the BmiCalculator SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Bmi
---@field bmi number
---@field category string
---@field height number
---@field weight number

---@class BmiLoadMatch
---@field height number
---@field weight number

local M = {}

return M
