package com.example.calc

import androidx.compose.foundation.layout.*
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun CalculatorScreen() {
    var displayText by remember { mutableStateOf("0") }
    var currentOperation by remember { mutableStateOf<Operation?>(null) }
    var operand1 by remember { mutableStateOf("0") }
    var operand2 by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Display(displayText)
        Spacer(modifier = Modifier.height(16.dp))
        ButtonGrid(
            onButtonClick = { buttonText:String ->
                val result = handleInput(buttonText, displayText, operand1, operand2, currentOperation)
                displayText = result.displayText
                operand1 = result.operand1
                operand2 = result.operand2
                currentOperation = result.operation
            }
        )
    }
}
