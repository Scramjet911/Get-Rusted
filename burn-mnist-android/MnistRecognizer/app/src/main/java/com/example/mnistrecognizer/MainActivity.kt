package com.example.mnistrecognizer

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Scaffold
import androidx.compose.ui.Modifier
import com.example.mnistrecognizer.ui.theme.MnistRecognizerTheme

class MainActivity : ComponentActivity() {
    init {
        System.loadLibrary("mnist_android")
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            MnistRecognizerTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    MnistRecognizePage()
                }
            }
        }
    }
}
