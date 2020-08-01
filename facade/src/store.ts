import { createStore } from "redux";
import defaultImage from "./question-mark.jpg";

export const selectImage = (url) => ({ type: "SELECT_IMAGE", payload: url });

export const setFilterNoise = (noiseValue) => ({
  type: "SET_FILTER_NOISE",
  payload: noiseValue,
});

export const setFilterHue = (hueValue) => ({
  type: "SET_FILTER_HUE",
  payload: hueValue,
});

export const setFilterRipple = (rippleValue) => ({
  type: "SET_FILTER_RIPPLE",
  payload: rippleValue,
});

const initialState = {
  selectedImageUrl: defaultImage,
  croppedImageUrl: "",
  filters: {
    noise: 0,
    hue: 0,
    ripple: 0,
  },
};

const reducer = (state = initialState, action) => {
  console.log("reducer called, action : ", action);

  switch (action.type) {
    case "CROP_IMAGE": {
      return {
        ...state,
        croppedImageUrl: action.payload,
      };
    }

    case "SELECT_IMAGE": {
      return {
        ...state,
        selectedImageUrl: action.payload,
      };
    }

    case "SET_FILTER_NOISE": {
      return { ...state, filters: { ...state.filters, noise: action.payload } };
    }

    case "SET_FILTER_HUE": {
      return { ...state, filters: { ...state.filters, hue: action.payload } };
    }

    case "SET_FILTER_RIPPLE": {
      return {
        ...state,
        filters: { ...state.filters, ripple: action.payload },
      };
    }
    default:
      return state;
  }
};

const configureStore = () => {
  return createStore(reducer);
};

export const store = configureStore();
