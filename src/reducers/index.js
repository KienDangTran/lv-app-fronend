import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import * as actionTypes from "../constants/actionTypes";
import paginate from "./paginate";

/**
 * Updates an entity cache in response to any action with response.entities.
 */
const entities = (state = { employees: {} }, action) => {
  if (action.response && action.response.entities) {
    return Object.assign({}, state, action.response.entities);
  }

  return state;
};

const pagination = combineReducers({
  employeePage: paginate({
    mapActionToKey: action => action.code,
    types         : [
      actionTypes.FETCH_EMPLOYEES_REQUEST,
      actionTypes.FETCH_EMPLOYEES_SUCCESS,
      actionTypes.FETCH_EMPLOYEES_FAILURE,
    ]
  })
});

const rootReducer = combineReducers(
  {
    routing,
    entities,
    pagination
  }
);

export default rootReducer;
