package com.example.calc

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import com.example.calc.ui.theme.CalculatorTheme

class MainActivity : ComponentActivity() {
    init {
        System.loadLibrary("calculator")
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CalculatorTheme {
                Surface(color = MaterialTheme.colorScheme.background) {
                    CalculatorScreen()
                }
            }
        }
    }


}