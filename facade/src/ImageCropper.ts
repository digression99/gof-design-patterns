import Croppie from "croppie";
import defaultImage from "./question-mark.jpg";
export class ImageCropper {
  constructor(public node: HTMLElement = null, public croppie: Croppie = null) {
    this.croppieContainer = document.getElementById("image-cropper");
    this.cropButton = document.getElementById("crop-button");
    this.croppedImage = document.getElementById("cropped-image");

    this.croppie = new Croppie(this.croppieContainer, {
      boundary: {
        width: 400,
        height: 400,
      },
      viewport: {
        width: 100,
        height: 100,
        type: "circle",
      },
      showZoomer: false,
    });

    console.log("ImageCropper imported.");

    this.croppie.bind({
      url: defaultImage,
    });

    this.cropButton.addEventListener("click", () => {
      this.croppie.result("blob").then((b) => {
        this.croppedImage.src = URL.createObjectURL(b);
      });
    });
  }

  getCroppedImage() {
    return this.croppie.result("blob").then(URL.createObjectURL);
  }
}
