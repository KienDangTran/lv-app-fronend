import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import { employees, employeePagination } from "./employeeReducer";

/**
 * Updates the pagination data for different actions.
 */
const pagination = combineReducers({ employeePagination });

/**
 * Updates an entity cache in response to any action with response.entities.
 */
const entities = combineReducers({ employees });

const rootReducer = combineReducers(
  {
    routing,
    entities,
    pagination
  }
);

export default rootReducer;
