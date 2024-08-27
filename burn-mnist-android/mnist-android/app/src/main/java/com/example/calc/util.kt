package com.example.calc

import android.content.Context
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.ColorMatrix
import android.graphics.ColorMatrixColorFilter
import android.graphics.Paint
import android.net.Uri
import android.util.Log
import java.io.File
import java.io.FileOutputStream
import java.io.IOException
import java.nio.ByteBuffer

fun uriToByteArray(context: Context, uri: Uri): Triple<ByteArray?, Int?, Int?> {
    val inputStream = context.contentResolver.openInputStream(uri) ?: return Triple(null,null,null)
    val byteArray = inputStream.readBytes()
//    MediaStore.Images.Media.getBitmap(context.contentResolver, uri)
//    val options = BitmapFactory.Options().apply {
//        inJustDecodeBounds = true
//    }
    val imageMap = BitmapFactory.decodeByteArray(byteArray, 0, byteArray.size)



    val reducedMap = Bitmap.createScaledBitmap(imageMap,28, 28,false)

//    val grayScaleMap = convertToGrayscale8Bit(context, reducedMap)

//    val bitFile = File(context.getExternalFilesDir(null),"Safe2.png")
//    saveBitmapToFile(grayScaleMap, bitFile)
//    val pixelBuffer = ByteBuffer.allocate(grayScaleMap.allocationByteCount);
//
//    grayScaleMap.copyPixelsToBuffer(pixelBuffer)
//    reducedMap.getPixels(pixelBuffer,0,width,0,0,width,height)

//    val outputStream = ByteArrayOutputStream()
//    reducedMap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
//    val arr = outputStream.toByteArray()
//    val pixelArray = pixelBuffer.array()

    val pixelArray = convertToGrayscaleArray(reducedMap)
//    Log.d("calc", "uriToByteArray: ${pixelArray.()}")
    return Triple(pixelArray, 28,28)
}

fun convertToGrayscaleArray(bmp: Bitmap): ByteArray {
    // Create a mutable bitmap with the same dimensions as the original
    val width = bmp.width
    val height = bmp.height
//    val grayscaleBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
//    val intArray = ArrayList<Int>()
    val grayscaleArray = ByteArray(width*height)
    // Iterate over each pixel in the original bitmap
    for (y in 0 until height) {
        for (x in 0 until width) {
            // Get the pixel color at (x, y)
            val pixel = bmp.getPixel(x, y)

            // Calculate the grayscale value using the average of the RGB components
            val r = Color.red(pixel)
            val g = Color.green(pixel)
            val b = Color.blue(pixel)
            val gray = (0.299*r + 0.587*g + 0.114*b).toInt()
//            intArray.add(gray)
            grayscaleArray[x + y*width] = gray.toByte()
            // Set the grayscale value back into the bitmap
//            val grayPixel = Color.rgb(gray, gray, gray)
//            grayscaleBitmap.setPixel(x, y, grayPixel)

        }
    }

    return grayscaleArray
}

fun convertToGrayscale8Bit(context: Context, originalBitmap: Bitmap): Bitmap {
    // Create a grayscale bitmap with 8-bit pixel depth

    val width = originalBitmap.width
    val height = originalBitmap.height
    val bmpGrayscale = Bitmap.createBitmap(width, height, Bitmap.Config.RGB_565)
    val c = Canvas(bmpGrayscale)
    val paint = Paint()
    val cm = ColorMatrix()
    cm.setSaturation(0f)
    val f = ColorMatrixColorFilter(cm)
    paint.setColorFilter(f)
    c.drawBitmap(originalBitmap, 0f, 0f, paint)

//    val bitFile = File(context.getExternalFilesDir(null),"exCon.png")
//    saveBitmapToFile(bmpGrayscale, bitFile)

    return bmpGrayscale
}

fun saveBitmapToFile(grayscaleBitmap: Bitmap, file: File): Boolean {
    var outputStream: FileOutputStream? = null
    return try {
        // Create an output stream to the specified file
        outputStream = FileOutputStream(file)

        // Compress the bitmap and save it to the output stream
        grayscaleBitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)

        // Flush and close the stream
        outputStream.flush()
        true
    } catch (e: IOException) {
        e.printStackTrace()
        false
    } finally {
        outputStream?.close()
    }
}