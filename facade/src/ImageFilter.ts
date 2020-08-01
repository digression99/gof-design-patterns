import { JSManipulate } from "./JSManipulate";
export class ImageFilter {
  constructor(
    public canvas: HTMLCanvasElement = null,
    public imageElement: HTMLImageElement = null
  ) {
    this.canvas = document.getElementById("image-filter") as HTMLCanvasElement;
    this.imageElement = new Image();
    this.imageElement.setAttribute("crossorigin", "true");
  }

  applyFilter(url) {
    const option = {
      name: "Noise",
      amount: 0.5,
    };

    this.imageElement.onload = function () {
      console.log("image element onload!");
      this.canvas.width = this.imageElement.width;
      this.canvas.height = this.imageElement.height;
      const context = this.canvas.getContext("2d");

      context.drawImage(this.imageElement, 0, 0);
      const data = context.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );

      JSManipulate.noise.filter(data, option.amount);
      context.putImageData(data, 0, 0);
    }.bind(this);

    this.imageElement.src = url;
  }
}
