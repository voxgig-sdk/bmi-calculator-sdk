package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "BmiCalculator",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://bmicalculatorapi.vercel.app",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"bmi": map[string]any{},
			},
		},
		"entity": map[string]any{
			"bmi": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "Category",
						"req": true,
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "bmi",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "height",
						"req": true,
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "weight",
						"req": true,
						"type": "`$NUMBER`",
					},
				},
				"name": "bmi",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 1.75,
											"kind": "param",
											"name": "height",
											"orig": "height",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 87.9,
											"kind": "param",
											"name": "weight",
											"orig": "weight",
											"reqd": true,
											"type": "`$NUMBER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/bmi/{weight}/{height}",
								"parts": []any{
									"api",
									"bmi",
									"{weight}",
									"{height}",
								},
								"select": map[string]any{
									"exist": []any{
										"height",
										"weight",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"bmi",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
