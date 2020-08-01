import Croppie from "croppie";
import defaultImage from "./question-mark.jpg";
export class ImageCropper {
  constructor(public node: HTMLElement = null, public croppie: Croppie = null) {
    this.node = document.getElementById("image-cropper");
    this.croppie = new Croppie(this.node, {
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

    this.croppie.update;
  }
}
