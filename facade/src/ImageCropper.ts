import Croppie from "croppie";
import { store, cropImage } from "./store";
import { croppieOptions } from "./constants";

export class ImageCropper {
  croppieContainer: HTMLDivElement;
  cropButton: HTMLButtonElement;
  croppedImage: HTMLImageElement;
  croppie: Croppie;

  constructor() {
    this.croppieContainer = document.getElementById(
      "image-cropper"
    ) as HTMLDivElement;
    this.cropButton = document.getElementById(
      "crop-button"
    ) as HTMLButtonElement;
    this.croppedImage = document.getElementById(
      "cropped-image"
    ) as HTMLImageElement;

    this.croppie = new Croppie(this.croppieContainer, croppieOptions);

    this.initialize();
  }

  initialize() {
    const state = store.getState();
    this.croppie.bind({ url: state.selectedImageUrl });

    const handleCropButtonClick = () =>
      this.croppie
        .result("blob")
        .then((b) => store.dispatch(cropImage(URL.createObjectURL(b))));
    this.cropButton.addEventListener("click", handleCropButtonClick);

    store.subscribe(() => {
      const state = store.getState();
      this.croppie.bind({ url: state.selectedImageUrl });
      this.croppedImage.src = state.croppedImageUrl;
    });
  }

  getCroppedImage() {
    return this.croppie.result("blob").then(URL.createObjectURL);
  }
}
