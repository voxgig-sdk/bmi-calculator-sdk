
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'BmiCalculator',
        slug: "bmi-calculator",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://bmicalculatorapi.vercel.app",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      bmi: {
      },

    }
  }


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
          "name": "bmi",
          "req": true,
          "short": "Calculated BMI (trimmed to 3 decimal points)",
          "type": "`$NUMBER`"
        },
        {
          "name": "height",
          "req": true,
          "short": "Provided height in meters",
          "type": "`$NUMBER`"
        },
        {
          "name": "weight",
          "req": true,
          "short": "Provided weight in kilograms",
          "type": "`$NUMBER`"
        }
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
              "parts": [
                "api",
                "bmi",
                "{weight}",
                "{height}"
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
              }
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
  }
}


const config = new Config()

export {
  config
}

