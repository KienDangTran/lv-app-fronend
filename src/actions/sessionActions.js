import { CALL_API } from "../middleware/api";
import * as endpoints from "../constants/endpoints";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(
      {
        [CALL_API]: {
          types        : [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
          endpoint     : endpoints.LOGIN,
          requestConfig: {
            method      : 'post',
            headers     : {
              'X-Requested-With': 'XMLHttpRequest',
              'Content-Type'    : 'application/json',
              'Cache-Control'   : 'no-cache'
            },
            responseType: 'json',
            data        : {
              username: username,
              password: password
            }
          }
        }
      }
    );
  };
};
