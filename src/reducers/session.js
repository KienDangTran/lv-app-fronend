import initialState from './initialState';
import * as SessionAction from '../actions/sessionActions';

const session = (state = initialState.session, action) => {
  switch (action.type) {
    case SessionAction.LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
      };

    case SessionAction.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.data.token);
      localStorage.setItem('refreshToken', action.payload.data.refreshToken);
      return {
        ...state,
        isAuthenticated: true,
        fetching: false
      };

    case SessionAction.LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload.response.data.message
      };

    case SessionAction.LOGOUT_REQUEST:
      return {
        ...state,
        fetching: true
      };

    case SessionAction.LOGOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state
      };

    default:
      return state;
  }
};

export default session;
