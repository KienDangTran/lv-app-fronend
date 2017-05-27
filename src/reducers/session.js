import initialState from './initialState';
import * as sessionActions from '../actions/sessionActions';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../utils/utils';

const session = (state = initialState.session, action) => {
  switch (action.type) {
    case sessionActions.LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case sessionActions.LOGIN_SUCCESS:
      localStorage.setItem(ACCESS_TOKEN, action.payload.token);
      localStorage.setItem(REFRESH_TOKEN, action.payload.refreshToken);
      return {
        ...state,
        isLoggedIn: true,
        fetching: false
      };

    case sessionActions.LOGIN_FAILURE:
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      return {
        ...state,
        isLoggedIn: false,
        error: action.payload
      };

    case sessionActions.LOGOUT_REQUEST:
      return {
        ...state,
        fetching: true
      };

    case sessionActions.LOGOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false
      };

    default:
      return state;
  }
};

export default session;
