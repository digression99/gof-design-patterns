import { store, selectImage } from "./store";

export class ImageSelector {
  imageSelectInput: HTMLInputElement;

  constructor() {
    this.imageSelectInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;

    this.initialize();
  }

  initialize() {
    this.imageSelectInput.addEventListener("change", (e) => {
      const selectedFile = (e.target as HTMLInputElement).files[0];
      store.dispatch(selectImage(URL.createObjectURL(selectedFile)));
    });
  }
}
