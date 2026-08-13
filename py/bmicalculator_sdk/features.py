# BmiCalculator SDK feature factory

from bmicalculator_sdk.feature.base_feature import BmiCalculatorBaseFeature
from bmicalculator_sdk.feature.test_feature import BmiCalculatorTestFeature


def _make_feature(name):
    features = {
        "base": lambda: BmiCalculatorBaseFeature(),
        "test": lambda: BmiCalculatorTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
