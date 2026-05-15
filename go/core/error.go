package core

type BmiCalculatorError struct {
	IsBmiCalculatorError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewBmiCalculatorError(code string, msg string, ctx *Context) *BmiCalculatorError {
	return &BmiCalculatorError{
		IsBmiCalculatorError: true,
		Sdk:              "BmiCalculator",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *BmiCalculatorError) Error() string {
	return e.Msg
}
