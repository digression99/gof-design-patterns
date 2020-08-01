import { ImageSelector } from "./ImageSelector";
import { ImageCropper } from "./ImageCropper";
import { ImageFilter } from "./ImageFilter";
import { RangeSlider } from "./RangeSlider";

export class ImageCropModal {
  constructor(
    public imageSelector: ImageSelector = null,
    public imageCropper: ImageCropper = null,
    public imageFilter: ImageFilter = null,
    public rangeSlider: RangeSlider = null
  ) {
    this.imageSelector = new ImageSelector();
    this.imageCropper = new ImageCropper();
    this.imageFilter = new ImageFilter();
    this.rangeSlider = new RangeSlider();
    console.log("ImageCropModal imported.");
  }
}
