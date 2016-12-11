import * as actionTypes from "../constants/actionTypes";
import * as api from "../constants/api";

/**
 * Extracts the next page URL from Github API response.
 * @param response
 * @returns {*}
 */
const getNextPageUrl = response => {
  const link = response.headers.get('link');
  if (!link) {
    return null;
  }

  const nextLink = link.split(',').find(s => s.indexOf('rel="next"') > -1);
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
};

/**
 * Fetches an API response and normalizes the result JSON according to schema. This makes every API response have the
 * same shape, regardless of how nested it was.
 * @param endpoint
 * @param schema
 * @returns {*|Promise.<T>}
 */
const callApi = (endpoint, schema) => {
  const fullUrl = (endpoint.indexOf(api.API_ROOT) === -1) ? api.API_ROOT + endpoint : endpoint;

  return fetch(fullUrl).then(
    response => response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const nextPageUrl = getNextPageUrl(response);

      return Object.assign({}, { [schema]: json }, { nextPageUrl });
    })
  );
};

/**
 * A Redux middleware that interprets actions with CALL_API info specified. Performs the call and promises when such
 * actions are dispatched.
 * @param store
 */
export default store => next => action => {
  const callAPI = action[actionTypes.CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint }        = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[actionTypes.CALL_API];
    return finalAction;
  };

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type : failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
