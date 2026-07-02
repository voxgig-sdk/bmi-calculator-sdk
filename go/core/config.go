package core

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
			"auth": map[string]any{
				"prefix": "Bearer",
			},
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
						"active": true,
						"name": "bmi",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "category",
						"req": true,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "height",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "weight",
						"req": true,
						"type": "`$NUMBER`",
						"index$": 3,
					},
				},
				"name": "bmi",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"active": true,
											"example": 1.75,
											"kind": "param",
											"name": "height",
											"orig": "height",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"active": true,
											"example": 87.9,
											"kind": "param",
											"name": "weight",
											"orig": "weight",
											"reqd": true,
											"type": "`$NUMBER`",
										},
									},
								},
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
									"res": "`body.bmi`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
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
