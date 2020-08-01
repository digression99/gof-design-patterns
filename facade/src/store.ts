import { createStore } from "redux";

const initialState = {
  imageUrl: "",
};

const reducer = (state = initialState, action) => {
  console.log("reducer called, action : ", action);
  return state;
};

const configureStore = () => {
  return createStore(reducer);
};

export const store = configureStore();
