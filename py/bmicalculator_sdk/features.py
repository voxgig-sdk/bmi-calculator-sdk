# BmiCalculator SDK feature factory

from bmicalculator_sdk.feature.base_feature import BmiCalculatorBaseFeature
from bmicalculator_sdk.feature.ratelimit_feature import BmiCalculatorRatelimitFeature
from bmicalculator_sdk.feature.retry_feature import BmiCalculatorRetryFeature
from bmicalculator_sdk.feature.test_feature import BmiCalculatorTestFeature
from bmicalculator_sdk.feature.timeout_feature import BmiCalculatorTimeoutFeature


_FEATURES = {
    "base": lambda: BmiCalculatorBaseFeature(),
    "ratelimit": lambda: BmiCalculatorRatelimitFeature(),
    "retry": lambda: BmiCalculatorRetryFeature(),
    "test": lambda: BmiCalculatorTestFeature(),
    "timeout": lambda: BmiCalculatorTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
