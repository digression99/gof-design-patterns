import { ImageSelector } from "./ImageSelector";
import { ImageCropper } from "./ImageCropper";
import { ImageFilter } from "./ImageFilter";
import { store } from "./store";

export class ImageCropModal {
  constructor(
    public imageSelector: ImageSelector = null,
    public imageCropper: ImageCropper = null,
    public imageFilter: ImageFilter = null
  ) {
    this.imageSelector = new ImageSelector();
    this.imageCropper = new ImageCropper();
    this.imageFilter = new ImageFilter();

    const filterButton = document.getElementById("filter-button");

    filterButton.addEventListener("click", () => {
      const state = store.getState();

      this.imageFilter.applyFilter(state.selectedImageUrl);
    });
  }
}
