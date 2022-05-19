import { combineReducers } from "redux";
import productStore from "./productStore";

export default combineReducers({
  product: productStore,
});