import { combineReducers } from "redux";
import employees from "./employeeReducer";
import { routerReducer } from "react-router-redux";

const rootReducer = combineReducers(
  {
    routing: routerReducer,
    employees
  }
);

export default rootReducer;
