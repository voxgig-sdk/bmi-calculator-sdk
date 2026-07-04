# frozen_string_literal: true

# Typed models for the BmiCalculator SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Bmi entity data model.
#
# @!attribute [rw] bmi
#   @return [Float]
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] height
#   @return [Float]
#
# @!attribute [rw] weight
#   @return [Float]
Bmi = Struct.new(
  :bmi,
  :category,
  :height,
  :weight,
  keyword_init: true
)

# Request payload for Bmi#load.
#
# @!attribute [rw] height
#   @return [Float]
#
# @!attribute [rw] weight
#   @return [Float]
BmiLoadMatch = Struct.new(
  :height,
  :weight,
  keyword_init: true
)

