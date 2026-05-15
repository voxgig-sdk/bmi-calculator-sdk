package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBmiEntityFunc func(client *BmiCalculatorSDK, entopts map[string]any) BmiCalculatorEntity

