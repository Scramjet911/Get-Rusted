package com.example.calc

enum class Operation {
    ADD, SUBTRACT, MULTIPLY, DIVIDE
}

data class InputResult(
    val displayText: String,
    val operand1: String,
    val operand2: String,
    val operation: Operation?
)

external fun add(num1: Double, num2: Double): Double
external fun sub(num1: Double, num2: Double): Double
external fun div(num1: Double, num2: Double): Double
external fun mul(num1: Double, num2: Double): Double

fun handleInput(
    input: String,
    currentText: String,
    operand1: String,
    operand2: String,
    currentOperation: Operation?
): InputResult {
    return when (input) {
        "C" -> InputResult("0", "0", "", null)
        "=" -> if (currentOperation != null) {
            val result = performOperation(currentOperation, operand1.toDouble(), operand2.toDouble())
            InputResult(result.toString(), result.toString(), "", null)
        } else {
            InputResult(currentText, operand1, operand2, currentOperation)
        }
        "+", "-", "*", "/" -> {
            val operation = when (input) {
                "+" -> Operation.ADD
                "-" -> Operation.SUBTRACT
                "*" -> Operation.MULTIPLY
                "/" -> Operation.DIVIDE
                else -> null
            }
            val displayText = if (operand2.isEmpty()) {
                "$operand1 $input "
            } else {
                val result = performOperation(currentOperation!!, operand1.toDouble(), operand2.toDouble()).toString()
                "$result $input "
            }
            InputResult(displayText, operand1, "", operation)
        }
        else -> if (currentOperation == null) {
            val newOperand1 = if (currentText == "0") input else currentText + input
            InputResult(newOperand1, newOperand1, operand2, currentOperation)
        } else {
            val newOperand2 = operand2 + input
            InputResult(currentText + input, operand1, newOperand2, currentOperation)
        }
    }
}

fun performOperation(operation: Operation, operand1: Double, operand2: Double): Double {
    return when (operation) {
        Operation.ADD -> add(operand1, operand2)
        Operation.SUBTRACT -> sub(operand1, operand2)
        Operation.MULTIPLY -> mul(operand1, operand2)
        Operation.DIVIDE -> div(operand1, operand2)
    }
}
