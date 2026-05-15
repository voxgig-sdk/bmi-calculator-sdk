# ProjectName SDK exists test

import pytest
from bmicalculator_sdk import BmiCalculatorSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = BmiCalculatorSDK.test(None, None)
        assert testsdk is not None
