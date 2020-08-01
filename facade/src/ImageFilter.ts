import { JSManipulate } from "./JSManipulate";
import {
  store,
  selectImage,
  setFilterHue,
  setFilterNoise,
  setFilterRipple,
} from "./store";
import { RangeSlider } from "./RangeSlider";

export class ImageFilter {
  noiseFilterSlider: RangeSlider;
  hueFilterSlider: RangeSlider;
  rippleFilterSlider: RangeSlider;
  constructor(
    public canvas: HTMLCanvasElement = null,
    public imageElement: HTMLImageElement = null
  ) {
    this.canvas = document.getElementById("image-filter") as HTMLCanvasElement;
    this.noiseFilterSlider = new RangeSlider("range-slider-1", (elem, value) =>
      store.dispatch(setFilterNoise(value))
    );

    this.hueFilterSlider = new RangeSlider("range-slider-2", (elem, value) =>
      store.dispatch(setFilterHue(value))
    );

    this.rippleFilterSlider = new RangeSlider("range-slider-3", (elem, value) =>
      store.dispatch(setFilterRipple(value))
    );

    this.imageElement = new Image();
    this.imageElement.setAttribute("crossorigin", "true");
  }

  initialize() {}

  applyFilter(url) {
    const { noise, hue, ripple } = store.getState().filters;

    const getMultiplier = (v) => Math.max(0.0, Math.min(1.0, v / 11));

    const options = [
      {
        name: "noise",
        option: { amount: Math.round(getMultiplier(noise) * 100) },
      },
      { name: "hue", option: { amount: 1.0 - getMultiplier(hue) * 2.0 } },
      {
        name: "sineripple",
        option: { xAmplitude: Math.round(getMultiplier(ripple) * 30) },
      },
    ];

    this.imageElement.src = url;

    return new Promise((resolve) => {
      this.imageElement.onload = function () {
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

        options.map((o) => JSManipulate[o.name].filter(data, o.option));
        context.putImageData(data, 0, 0);

        this.canvas.toBlob((blob) => {
          store.dispatch(selectImage(URL.createObjectURL(blob)));
          resolve();
        });
      }.bind(this);
    });
  }
}
