import axios from 'axios';

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
export const callApi = (endpoint, method, additionalConfig) => {
  return axios({
    method: method ? method : 'get',
    url: endpoint,
    baseURL: BASE_URL,
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

  let {
    endpoint
  } = callAPI;
  const {
    method,
    additionalConfig,
    types
  } = callAPI;

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

  return callApi(endpoint, method, additionalConfig)
    .then(data => next(actionWith({
      type: successType,
      payload: data
    })))
    .catch(data => next(actionWith({
      type: failureType,
      payload: data
    })));
};
