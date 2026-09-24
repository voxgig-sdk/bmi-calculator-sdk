
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BmiCalculatorSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = BmiCalculatorSDK.test()
    equal(testsdk instanceof BmiCalculatorSDK, true,
      'BmiCalculatorSDK.test() must return a client synchronously')
  })

})
