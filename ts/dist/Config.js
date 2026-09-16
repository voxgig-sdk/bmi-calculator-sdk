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
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
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
                    "req": true,
                    "short": "Health category based on BMI",
                    "type": "`$STRING`"
                },
                {
                    "format": "float",
                    "name": "bmi",
                    "req": true,
                    "short": "Calculated BMI (trimmed to 3 decimal points)",
                    "type": "`$NUMBER`"
                },
                {
                    "format": "float",
                    "name": "height",
                    "req": true,
                    "short": "Provided height in meters",
                    "type": "`$NUMBER`"
                },
                {
                    "name": "id",
                    "type": "`$STRING`"
                },
                {
                    "format": "float",
                    "name": "weight",
                    "req": true,
                    "short": "Provided weight in kilograms",
                    "type": "`$NUMBER`"
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
                            "args": {
                                "params": [
                                    {
                                        "example": 1.75,
                                        "kind": "param",
                                        "name": "height",
                                        "orig": "height",
                                        "reqd": true,
                                        "type": "`$NUMBER`"
                                    },
                                    {
                                        "example": 87.9,
                                        "kind": "param",
                                        "name": "weight",
                                        "orig": "weight",
                                        "reqd": true,
                                        "type": "`$NUMBER`"
                                    }
                                ]
                            },
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
                            "select": {
                                "exist": [
                                    "height",
                                    "weight"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "api",
                                "bmi",
                                "{weight}",
                                "{height}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "bmi"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map