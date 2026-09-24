

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { BmiCalculatorSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('BmiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BMI_CALCULATOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('BMI_CALCULATOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BmiCalculatorSDK.test()
    const ent = testsdk.Bmi()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BMI_CALCULATOR_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bmi.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"Category":{"a":true,"h":"Category","n":"Category","r":true,"sh":"Health category based on BMI","t":"`$STRING`","key$":"Category","index$":0},"bmi":{"a":true,"fo":"float","h":"Bmi","n":"bmi","r":true,"sh":"Calculated BMI (trimmed to 3 decimal points)","t":"`$NUMBER`","key$":"bmi","index$":1},"height":{"a":true,"fo":"float","h":"Height","n":"height","r":true,"sh":"Provided height in meters","t":"`$NUMBER`","key$":"height","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":3},"weight":{"a":true,"fo":"float","h":"Weight","n":"weight","r":true,"sh":"Provided weight in kilograms","t":"`$NUMBER`","key$":"weight","index$":4}},"id":{"field":"id","from":{"height":"height","weight":"weight"},"name":"id","parts":["weight","height"],"sep":"/"},"name":"bmi","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/bmi/{weight}/{height}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":1.75,"k":"param","n":"height","or":"height","r":true,"t":"`$NUMBER`","index$":0},{"a":true,"ex":87.9,"k":"param","n":"weight","or":"weight","r":true,"t":"`$NUMBER`","index$":1}]},"k":"http","m":"GET","o":"/api/bmi/{weight}/{height}","q":{"exist":["height","weight"]},"r":{},"s":[{"lit":"api"},{"lit":"bmi"},{"var":"weight"},{"var":"height"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"bmi","name__orig":"bmi","Name":"Bmi","name_":"bmi","name-":"bmi","NAME":"BMI","index$":0}, {"active":true,"entity":"bmi","key$":"BasicBmiFlow","kind":"basic","name":"BasicBmiFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"bmi_ref01","srcdatavar":"bmi_ref01_data","suffix":"_dt0"},"m":{"id":"bmi01","weight":"weight01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bmi_ref01"}}],"index$":0}]}, 'Bmi', {"GET /api/bmi/{weight}/{height}":{"protocol":"http","operationId":"calculateBMI","responses":{"200":{"description":"Successful BMI calculation","content":{"application/json":{"schema":{"type":"object","properties":{"Category":{"type":"string","description":"Health category based on BMI","enum":["Underweight","Normal weight","Overweight","Obese"],"example":"Overweight","key$":"Category"},"bmi":{"type":"number","format":"float","description":"Calculated BMI (trimmed to 3 decimal points)","example":28.702,"key$":"bmi"},"height":{"type":"number","format":"float","description":"Provided height in meters","example":1.75,"key$":"height"},"weight":{"type":"number","format":"float","description":"Provided weight in kilograms","example":87.9,"key$":"weight"}},"required":["Category","bmi","height","weight"],"index$":0},"example":{"Category":"Overweight","bmi":28.702,"height":1.75,"weight":87.9}}}},"400":{"description":"Bad request - Invalid parameters or height is zero","content":{"application/json":{"schema":{"oneOf":[{"type":"object","properties":{"Error":{"type":"string","example":"Height parameter cannot be Zero"}}},{"type":"object","properties":{"error":{"type":"string","example":"Invalid parameters. Please provide numeric values for weight and height."}}}]},"examples":{"heightIsZero":{"summary":"Height is zero","value":{"Error":"Height parameter cannot be Zero"}},"invalidParameters":{"summary":"Invalid parameters","value":{"error":"Invalid parameters. Please provide numeric values for weight and height."}}}}}}},"parameters":[{"name":"weight","in":"path","description":"Body weight in kilograms","required":true,"schema":{"type":"number","format":"float","example":87.9},"index$":0},{"name":"height","in":"path","description":"Height in meters","required":true,"schema":{"type":"number","format":"float","example":1.75,"exclusiveMinimum":0},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bmi_ref01_data = Object.values(setup.data.existing.bmi)[0] as any

    // LOAD
    const bmi_ref01_ent = client.Bmi()
    const bmi_ref01_match_dt0: any = {}
    bmi_ref01_match_dt0.id = bmi_ref01_data.id
    const bmi_ref01_data_dt0 = (await bmi_ref01_ent.load(bmi_ref01_match_dt0)).data()
    assert(bmi_ref01_data_dt0.id === bmi_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bmi/BmiTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = BmiCalculatorSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['bmi01','bmi02','bmi03','weight01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BMI_CALCULATOR_TEST_BMI_ENTID': idmap,
    'BMI_CALCULATOR_TEST_LIVE': 'FALSE',
    'BMI_CALCULATOR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['BMI_CALCULATOR_TEST_BMI_ENTID']

  const live = 'TRUE' === env.BMI_CALCULATOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BMI_CALCULATOR_TEST_BMI_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new BmiCalculatorSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.BMI_CALCULATOR_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
