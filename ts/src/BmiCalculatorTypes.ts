// Typed models for the BmiCalculator SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Bmi {
  Category: string
  bmi: number
  height: number
  id?: string
  weight: number
}

export interface BmiLoadMatch {
  height: number
  weight: number
}

