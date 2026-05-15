
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BmiCalculatorSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await BmiCalculatorSDK.test()
    equal(null !== testsdk, true)
  })

})
