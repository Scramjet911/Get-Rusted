package com.example.calc

import android.net.Uri
import android.util.Log
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.layout.*
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.unit.dp
import java.nio.ByteBuffer

external fun infer(inputImage: ByteArray, imgWidth: Int, imgHeight: Int): Int;
@Composable
fun ImageProcessorScreen() {
    var result by remember { mutableStateOf<Int?>(null) }
    val context = LocalContext.current

    // Launcher to pick an image from the file explorer
    val pickImageLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetContent()
    ) { uri: Uri? ->
        uri?.let {
            val results = uriToByteArray(context, it);
            val byteArray = results.first;
            val imgWidth = results.second
            val imgHeight = results.third
            Log.d("calc", "ImageProcessorScreen: ${imgWidth} ${imgHeight}")
            if(byteArray != null && imgWidth != null && imgHeight != null){
                Log.d("Calc", "ImageProcessorScreen: ${byteArray.size}")
                result = infer(byteArray, imgWidth, imgHeight)
            }
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Button(onClick = { pickImageLauncher.launch("image/*") }) {
            Text("Select Image")
        }

        Spacer(modifier = Modifier.height(16.dp))

        result?.let {
            Text("JNI Result: $it")
        }
    }
}