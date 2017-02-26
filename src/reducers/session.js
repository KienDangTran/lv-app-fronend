import initialState from "./initialState";
import * as loginActionTypes from "../actions/sessionActions";
import { browserHistory } from "react-router";

const session = (state = initialState.session, action) => {
  switch (action.type) {
    case loginActionTypes.LOGIN_SUCCESS:
      sessionStorage.setItem('jwt', action.payload);
      browserHistory.push('/');
      return {
        ...state,
        isAuthenticated: true
      };
    case loginActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default session;
