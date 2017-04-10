import initialState from './initialState';
import * as sessionActions from '../actions/sessionActions';

export const TOKEN_NAME = 'token';
export const REFRESH_TOKEN_NAME = 'refreshToken';

const session = (state = initialState.session, action) => {
  switch (action.type) {
    case sessionActions.LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case sessionActions.LOGIN_SUCCESS:
      localStorage.setItem(TOKEN_NAME, action.payload.token);
      localStorage.setItem(REFRESH_TOKEN_NAME, action.payload.refreshToken);
      return {
        ...state,
        isAuthenticated: true,
        fetching: false
      };

    case sessionActions.LOGIN_FAILURE:
      localStorage.removeItem(TOKEN_NAME);
      localStorage.removeItem(REFRESH_TOKEN_NAME);
      return {
        ...state,
        isAuthenticated: false,
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
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default session;
