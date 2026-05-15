# BmiCalculator SDK utility: make_context

from core.context import BmiCalculatorContext


def make_context_util(ctxmap, basectx):
    return BmiCalculatorContext(ctxmap, basectx)
