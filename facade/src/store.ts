import { createStore } from "redux";
import defaultImage from "./question-mark.jpg";

const initialState = {
  imageUrl: defaultImage,
  croppedImageUrl: "",
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
    default:
      return state;
  }
};

const configureStore = () => {
  return createStore(reducer);
};

export const store = configureStore();
