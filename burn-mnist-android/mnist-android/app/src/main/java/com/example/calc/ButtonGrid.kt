package com.example.calc

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@Composable
fun ButtonGrid(onButtonClick: (String) -> Unit) {
    val buttons = listOf(
        listOf("C"),
        listOf("7", "8", "9", "/"),
        listOf("4", "5", "6", "*"),
        listOf("1", "2", "3", "-"),
        listOf("0", ".", "=", "+")
    )

    Column(modifier = Modifier.fillMaxWidth()) {
        for (row in buttons) {
            Row(modifier = Modifier.fillMaxWidth()) {
                for (buttonText in row) {
                    CalculatorButton(
                        text = buttonText,
                        modifier = Modifier
                            .weight(1f)
                            .aspectRatio(if(buttonText != "C") 1f else 4f)
                            .padding(8.dp),
                        onClick = { onButtonClick(buttonText) }
                    )
                }
            }
        }
    }
}
