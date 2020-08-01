import JSR from "mm-jsr";

export class RangeSlider {
  constructor() {
    const parent = document.getElementById("range-slider");
    const input = document.createElement("input");

    parent.appendChild(input);
    const jsr = new JSR(input, {
      max: 11,
      values: [0],
      sliders: 1,
      grid: false,
    });

    jsr.addEventListener("update", (elem, value) => {
      console.log("elem : ", elem);
      console.log("value : ", value);
    });
  }
}
