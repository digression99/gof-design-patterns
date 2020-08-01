import JSR from "mm-jsr";
import { store } from "./store";

export class RangeSlider {
  jsr: JSR;

  constructor(elementId: string, handleUpdate: Function) {
    const parent = document.getElementById(elementId);
    const input = document.createElement("input");

    parent.appendChild(input);

    this.jsr = new JSR(input, {
      max: 11,
      values: [0],
      sliders: 1,
      grid: false,
    });

    this.jsr.addEventListener("update", handleUpdate);
  }
}
