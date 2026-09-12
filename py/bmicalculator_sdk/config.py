# BmiCalculator SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


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
            "slug": "bmi-calculator",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "short": "Health category based on BMI",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "bmi",
            "req": True,
            "short": "Calculated BMI (trimmed to 3 decimal points)",
            "type": "`$NUMBER`",
          },
          {
            "format": "float",
            "name": "height",
            "req": True,
            "short": "Provided height in meters",
            "type": "`$NUMBER`",
          },
          {
            "name": "id",
            "type": "`$STRING`",
          },
          {
            "format": "float",
            "name": "weight",
            "req": True,
            "short": "Provided weight in kilograms",
            "type": "`$NUMBER`",
          },
        ],
        "id": {
          "field": "id",
          "from": {
            "height": "height",
            "weight": "weight",
          },
          "name": "id",
          "parts": [
            "weight",
            "height",
          ],
          "sep": "/",
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
                "segments": [
                  {
                    "lit": "api",
                  },
                  {
                    "lit": "bmi",
                  },
                  {
                    "var": "weight",
                  },
                  {
                    "var": "height",
                  },
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
                "parts": [
                  "api",
                  "bmi",
                  "{weight}",
                  "{height}",
                ],
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
