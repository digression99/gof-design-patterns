import "./styles.scss";
import "mm-jsr/dist/assets/css/main.css";
import "croppie/croppie.css";
import { ImageCropModal } from "./ImageCropModal";

document.addEventListener("DOMContentLoaded", () => {
  new ImageCropModal();
  console.log("typescript loaded.");
});
