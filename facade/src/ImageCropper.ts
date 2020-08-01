import Croppie from "croppie";
import { store } from "./store";
import { croppieOptions } from "./constants";

const cropImage = (blobUrl) => ({ type: "CROP_IMAGE", payload: blobUrl });
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
  }

  initialize() {
    const state = store.getState();
    this.croppie.bind({ url: state.imageUrl });

    const handleCropButtonClick = () =>
      this.croppie.result("blob").then((b) => store.dispatch(cropImage(b)));
    this.cropButton.addEventListener("click", handleCropButtonClick);

    store.subscribe(() => {
      const state = store.getState();
      this.croppedImage.src = state.croppedImageUrl;
    });
  }

  getCroppedImage() {
    return this.croppie.result("blob").then(URL.createObjectURL);
  }
}
