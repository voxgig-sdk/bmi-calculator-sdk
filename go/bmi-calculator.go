package voxgigbmicalculatorsdk

import (
	"github.com/voxgig-sdk/bmi-calculator-sdk/core"
	"github.com/voxgig-sdk/bmi-calculator-sdk/entity"
	"github.com/voxgig-sdk/bmi-calculator-sdk/feature"
	_ "github.com/voxgig-sdk/bmi-calculator-sdk/utility"
)

// Type aliases preserve external API.
type BmiCalculatorSDK = core.BmiCalculatorSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type BmiCalculatorEntity = core.BmiCalculatorEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type BmiCalculatorError = core.BmiCalculatorError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBmiEntityFunc = func(client *core.BmiCalculatorSDK, entopts map[string]any) core.BmiCalculatorEntity {
		return entity.NewBmiEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewBmiCalculatorSDK = core.NewBmiCalculatorSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
