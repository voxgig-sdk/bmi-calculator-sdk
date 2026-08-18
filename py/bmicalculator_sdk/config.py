# BmiCalculator SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
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
            "name": "Category",
            "req": True,
            "type": "`$STRING`",
          },
          {
            "name": "bmi",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "height",
            "req": True,
            "type": "`$NUMBER`",
          },
          {
            "name": "weight",
            "req": True,
            "type": "`$NUMBER`",
          },
        ],
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
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 87.9,
                      "kind": "param",
                      "name": "weight",
                      "orig": "weight",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
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
