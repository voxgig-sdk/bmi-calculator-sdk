# BmiCalculator SDK configuration


def make_config():
    return {
        "main": {
            "name": "BmiCalculator",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://bmicalculatorapi.vercel.app",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "bmi": {},
            },
        },
        "entity": {
      "bmi": {
        "fields": [
          {
            "name": "bmi",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "category",
            "req": True,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "height",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "weight",
            "req": True,
            "type": "`$NUMBER`",
            "active": True,
            "index$": 3,
          },
        ],
        "name": "bmi",
        "op": {
          "load": {
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
                      "reqd": True,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "example": 87.9,
                      "kind": "param",
                      "name": "weight",
                      "orig": "weight",
                      "reqd": True,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/bmi/{weight}/{height}",
                "parts": [
                  "api",
                  "bmi",
                  "{weight}",
                  "{height}",
                ],
                "select": {
                  "exist": [
                    "height",
                    "weight",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "bmi",
            ],
          ],
        },
      },
    },
    }
