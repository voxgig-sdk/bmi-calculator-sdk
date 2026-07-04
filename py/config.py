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
            "active": True,
            "name": "bmi",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "category",
            "req": True,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "height",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "weight",
            "req": True,
            "type": "`$NUMBER`",
            "index$": 3,
          },
        ],
        "name": "bmi",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "example": 1.75,
                      "kind": "param",
                      "name": "height",
                      "orig": "height",
                      "reqd": True,
                      "type": "`$NUMBER`",
                      "index$": 0,
                    },
                    {
                      "active": True,
                      "example": 87.9,
                      "kind": "param",
                      "name": "weight",
                      "orig": "weight",
                      "reqd": True,
                      "type": "`$NUMBER`",
                      "index$": 1,
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
                  "res": "`body.bmi`",
                },
                "index$": 0,
              },
            ],
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
