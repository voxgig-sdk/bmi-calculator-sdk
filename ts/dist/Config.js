"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'BmiCalculator',
        slug: "bmi-calculator",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://bmicalculatorapi.vercel.app",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            bmi: {},
        }
    };
    entity = {
        "bmi": {
            "fields": [
                {
                    "name": "Category",
                    "title": "Category",
                    "type": "`$STRING`",
                    "req": true,
                    "short": "Health category based on BMI"
                },
                {
                    "name": "bmi",
                    "title": "Bmi",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Calculated BMI (trimmed to 3 decimal points)",
                    "format": "float"
                },
                {
                    "name": "height",
                    "title": "Height",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Provided height in meters",
                    "format": "float"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "weight",
                    "title": "Weight",
                    "type": "`$NUMBER`",
                    "req": true,
                    "short": "Provided weight in kilograms",
                    "format": "float"
                }
            ],
            "id": {
                "field": "id",
                "from": {
                    "height": "height",
                    "weight": "weight"
                },
                "name": "id",
                "parts": [
                    "weight",
                    "height"
                ],
                "sep": "/"
            },
            "name": "bmi",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/api/bmi/{weight}/{height}",
                            "segments": [
                                {
                                    "lit": "api"
                                },
                                {
                                    "lit": "bmi"
                                },
                                {
                                    "var": "weight"
                                },
                                {
                                    "var": "height"
                                }
                            ],
                            "parts": [
                                "api",
                                "bmi",
                                "{weight}",
                                "{height}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "params": [
                                    {
                                        "name": "height",
                                        "orig": "height",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": 1.75
                                    },
                                    {
                                        "name": "weight",
                                        "orig": "weight",
                                        "type": "`$NUMBER`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": 87.9
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "height",
                                    "weight"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map