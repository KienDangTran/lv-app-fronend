import axios from 'axios';
import { normalize } from 'normalizr';
import * as httpStatus from '../constants/httpStatus';
import { LOGIN_FAILURE } from '../actions/sessionActions';

/**
 * Action key that carries API call info interpreted by this Redux middleware.
 * @type {Symbol}
 */
export const CALL_API = Symbol('Call API');
export const BASE_URL = 'http://127.0.0.1:8080/api/';

/**
 *
 * Fetches an API response and normalizes the result JSON according to schema.
 * This makes every API response have the same shape, regardless of how nested it was.
 * @param endpoint - the server URL that will be used for the request
 * @param additionalConfig - https://github.com/mzabriskie/axios#request-config
 * @returns {Promise.<T>|Promise<R>}
 */
export const callApi = (endpoint, authenticated = true, additionalConfig = {}) => {
  let headers = {
    ...additionalConfig.headers,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  };

  if (authenticated) {
    const token = localStorage.getItem('token') || null;
    if (token) {
      headers = {
        ...headers,
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      };
    }
    else {
      throw 'Authentication Token not found!';
    }
  }

  return axios({
    url: endpoint,
    baseURL: BASE_URL,
    headers: headers,
    ...additionalConfig
  });
};

/**
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 * @param store
 */
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { authenticated, additionalConfig, types, schema } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;

  next(actionWith({
    type: requestType
  }));

  return callApi(endpoint, authenticated, additionalConfig)
    .then(
    response => next(actionWith({
      type: successType,
      payload: schema ? Object.assign({}, normalize(response.data.result, schema)) : response.data
    })),
    error => {
      if (!error.response) {
        next(actionWith({
          type: failureType,
          payload: { message: error.message }
        }));
      } else if (error.response.status === httpStatus.AUTHENTICATION_FAILURE) {
        next(actionWith({
          type: LOGIN_FAILURE,
          payload: error.response.data
        }));
      } else {
        next(actionWith({
          type: failureType,
          payload: error.response.data
        }));
      }
    }
    )
    .catch(e => { throw e; });
};
