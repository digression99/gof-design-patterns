import { ImageSelector } from "./ImageSelector";
import { ImageCropper } from "./ImageCropper";
import { ImageFilter } from "./ImageFilter";

export class ImageCropModal {
  constructor(
    public imageSelector: ImageSelector = null,
    public imageCropper: ImageCropper = null,
    public imageFilter: ImageFilter = null
  ) {
    this.imageSelector = new ImageSelector();
    this.imageCropper = new ImageCropper();
    this.imageFilter = new ImageFilter();
    console.log("ImageCropModal imported.");
  }
}
