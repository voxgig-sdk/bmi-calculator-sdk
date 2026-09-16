

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"Category","req":true,"short":"Health category based on BMI","type":"`$STRING`","index$":0},{"active":true,"format":"float","name":"bmi","req":true,"short":"Calculated BMI (trimmed to 3 decimal points)","type":"`$NUMBER`","index$":1},{"active":true,"format":"float","name":"height","req":true,"short":"Provided height in meters","type":"`$NUMBER`","index$":2},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":3},{"active":true,"format":"float","name":"weight","req":true,"short":"Provided weight in kilograms","type":"`$NUMBER`","index$":4}],"id":{"field":"id","from":{"height":"height","weight":"weight"},"name":"id","parts":["weight","height"],"sep":"/"},"name":"bmi","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":1.75,"kind":"param","name":"height","orig":"height","reqd":true,"type":"`$NUMBER`","index$":0},{"active":true,"example":87.9,"kind":"param","name":"weight","orig":"weight","reqd":true,"type":"`$NUMBER`","index$":1}]},"contract":{"id":"GET /api/bmi/{weight}/{height}","json":"{\"operationId\":\"calculateBMI\",\"parameters\":[{\"description\":\"Body weight in kilograms\",\"in\":\"path\",\"name\":\"weight\",\"required\":true,\"schema\":{\"example\":87.9,\"format\":\"float\",\"type\":\"number\"}},{\"description\":\"Height in meters\",\"in\":\"path\",\"name\":\"height\",\"required\":true,\"schema\":{\"example\":1.75,\"exclusiveMinimum\":0,\"format\":\"float\",\"type\":\"number\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"Category\":\"Overweight\",\"bmi\":28.702,\"height\":1.75,\"weight\":87.9},\"schema\":{\"properties\":{\"Category\":{\"description\":\"Health category based on BMI\",\"enum\":[\"Underweight\",\"Normal weight\",\"Overweight\",\"Obese\"],\"example\":\"Overweight\",\"type\":\"string\"},\"bmi\":{\"description\":\"Calculated BMI (trimmed to 3 decimal points)\",\"example\":28.702,\"format\":\"float\",\"type\":\"number\"},\"height\":{\"description\":\"Provided height in meters\",\"example\":1.75,\"format\":\"float\",\"type\":\"number\"},\"weight\":{\"description\":\"Provided weight in kilograms\",\"example\":87.9,\"format\":\"float\",\"type\":\"number\"}},\"required\":[\"Category\",\"bmi\",\"height\",\"weight\"],\"type\":\"object\"}}},\"description\":\"Successful BMI calculation\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"heightIsZero\":{\"summary\":\"Height is zero\",\"value\":{\"Error\":\"Height parameter cannot be Zero\"}},\"invalidParameters\":{\"summary\":\"Invalid parameters\",\"value\":{\"error\":\"Invalid parameters. Please provide numeric values for weight and height.\"}}},\"schema\":{\"oneOf\":[{\"properties\":{\"Error\":{\"example\":\"Height parameter cannot be Zero\",\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"error\":{\"example\":\"Invalid parameters. Please provide numeric values for weight and height.\",\"type\":\"string\"}},\"type\":\"object\"}]}}},\"description\":\"Bad request - Invalid parameters or height is zero\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/bmi/{weight}/{height}","segments":[{"lit":"api"},{"lit":"bmi"},{"var":"weight"},{"var":"height"}],"select":{"exist":["height","weight"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["bmi"]]},"key$":"bmi","name__orig":"bmi","Name":"Bmi","name_":"bmi","name-":"bmi","NAME":"BMI","index$":0}, {"active":true,"entity":"bmi","key$":"BasicBmiFlow","kind":"basic","name":"BasicBmiFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"bmi_ref01","srcdatavar":"bmi_ref01_data","suffix":"_dt0"},"match":{"id":"bmi01","weight":"weight01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bmi_ref01"}}],"index$":0}]}, 'Bmi')
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
    ['bmi01','bmi02','bmi03','bmi01','bmi02','bmi03'],
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
  
