import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import offer from "./offer";
import post from "./post";
import vehicle from "./vehicle";

export default combineReducers({
  alert,
  auth,
  profile,
  offer,
  post,
  vehicle,
});
