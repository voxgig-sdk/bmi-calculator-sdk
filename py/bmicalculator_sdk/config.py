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
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
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
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
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
            "title": "Category",
            "type": "`$STRING`",
            "req": True,
            "short": "Health category based on BMI",
          },
          {
            "name": "bmi",
            "title": "Bmi",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Calculated BMI (trimmed to 3 decimal points)",
            "format": "float",
          },
          {
            "name": "height",
            "title": "Height",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Provided height in meters",
            "format": "float",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
          {
            "name": "weight",
            "title": "Weight",
            "type": "`$NUMBER`",
            "req": True,
            "short": "Provided weight in kilograms",
            "format": "float",
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
                "parts": [
                  "api",
                  "bmi",
                  "{weight}",
                  "{height}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "height",
                      "orig": "height",
                      "type": "`$NUMBER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 1.75,
                    },
                    {
                      "name": "weight",
                      "orig": "weight",
                      "type": "`$NUMBER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 87.9,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "height",
                    "weight",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
