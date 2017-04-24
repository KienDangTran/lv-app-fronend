import {
  CALL_API
} from '../middleware/api';
import * as endpoints from '../constants/endpoints';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (username, password) => {
  return dispatch => {
    dispatch({
      [CALL_API]: {
        types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
        endpoint: endpoints.LOGIN,
        authenticated: false,
        additionalConfig: {
          method: 'post',
          data: {
            username,
            password
          }
        }
      }
    });
  };
};

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const logout = () => {
  return dispatch => {
    dispatch({ type: LOGOUT_REQUEST });
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch({ type: LOGOUT_FAILURE });
  };
};

