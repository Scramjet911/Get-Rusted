import init, { classify_image } from "animal-classify";

var selectedImage = document.getElementById("selectedImage");
var processedImage = document.getElementById("processedImage");

console.log("testing");
document
  .getElementById("imageInput")
  .addEventListener("change", function (event) {
    var file = event.target.files[0];
    var buffer_reader = new FileReader();
    var url_reader = new FileReader();
    var processed_buffer;

    buffer_reader.onload = function (event) {
      var image_buffer = new Uint8Array(buffer_reader.result);
      var processedDataResult = classify_image(image_buffer);
      console.log(processedDataResult);
    };

    if (file) {
      buffer_reader.readAsArrayBuffer(file);
      selectedImage.src = URL.createObjectURL(file);
    }
  });
init().then(() => {});
