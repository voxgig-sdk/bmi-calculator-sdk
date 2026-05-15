
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'ProjectName',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    }

  }


  options = {
    base: 'https://bmicalculatorapi.vercel.app',

    auth: {
      prefix: 'Bearer',
    },

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
          "name": "bmi",
          "req": true,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 0
        },
        {
          "name": "category",
          "req": true,
          "type": "`$STRING`",
          "active": true,
          "index$": 1
        },
        {
          "name": "height",
          "req": true,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 2
        },
        {
          "name": "weight",
          "req": true,
          "type": "`$NUMBER`",
          "active": true,
          "index$": 3
        }
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
                    "reqd": true,
                    "type": "`$NUMBER`",
                    "active": true
                  },
                  {
                    "example": 87.9,
                    "kind": "param",
                    "name": "weight",
                    "orig": "weight",
                    "reqd": true,
                    "type": "`$NUMBER`",
                    "active": true
                  }
                ]
              },
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
              },
              "active": true,
              "index$": 0
            }
          ],
          "input": "data",
          "key$": "load"
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

