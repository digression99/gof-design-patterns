import { store } from "./store";

export class ImageSelector {
  constructor() {
    const input = document.getElementById("image-input");

    input.addEventListener("change", (e) => {
      const selectedFile = (e.target as HTMLInputElement).files[0];
      store.dispatch({ type: "SELECT_FILE", payload: selectedFile });
    });
  }
}
