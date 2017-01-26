import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import Immutable from "immutable";
import initialState from "./initialState";
import schemas from "../api/schemas";
import * as employeeActions from "../actions/employeeActions";
import * as userActions from "../actions/userActions";
import paginate from "./paginate";

/**
 * Updates an entity cache in response to any action with response.entities.
 */
const entities = (
  state = initialState.entities,
  action
) => {
  if (action.payload && action.payload.entities) {
    return Immutable.fromJS(state).mergeDeep(action.payload.entities).toJS();
  }
  return state;
};

/**
 * Updates the pagination data for different actions.
 */
const pagination = combineReducers(
  {
    [schemas.EMPLOYEE.key]: paginate(
      {
        schemaKey: schemas.EMPLOYEE.key,
        types    : [
          employeeActions.FETCH_EMPLOYEES,
          employeeActions.FETCH_EMPLOYEES_SUCCESS,
          employeeActions.FETCH_EMPLOYEES_FAILURE,
          employeeActions.COUNT_EMPLOYEES_SUCCESS
        ]
      }
    ),
    [schemas.USER.key]    : paginate(
      {
        schemaKey: schemas.USER.key,
        types    : [
          userActions.FETCH_USERS,
          userActions.FETCH_USERS_SUCCESS,
          userActions.FETCH_USERS_FAILURE,
          userActions.COUNT_USERS_SUCCESS
        ]
      }
    )
  }
);

const rootReducer = combineReducers(
  {
    entities,
    pagination,
    routing
  }
);

export default rootReducer;
