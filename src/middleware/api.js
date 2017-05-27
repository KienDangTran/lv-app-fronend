import { normalize } from 'normalizr';
import * as utils from '../utils/utils';
import * as httpStatus from '../constants/httpStatus';
import { LOGIN_FAILURE } from '../actions/sessionActions';

/**
 * Action key that carries API call info interpreted by this Redux middleware.
 * @type {Symbol}
 */
export const CALL_API = Symbol('Call API');

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
  const { requireAuthentication, additionalConfig, types, schema } = callAPI;

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

  const handleApiResponse = (response) => {
    next(actionWith({
      type: successType,
      payload: schema
        ? Object.assign({}, normalize(response.data.result, schema))
        : response.data
    }));
  };

  const handleApiError = (error) => {
    if (!error.response) {
      next(actionWith({
        type: failureType,
        payload: { message: error.message }
      }));
    } else if (error.response.status === httpStatus.AUTHENTICATION_FAILURE) {
      if (error.response.data && error.response.data.errorCode === utils.JWT_TOKEN_EXPIRED) {
        return utils.refreshTokenThenCallAPI(endpoint, additionalConfig)
          .then(response => handleApiResponse(response), error => handleApiError(error))
          .catch(ex => { throw ex; });
      }
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
  };

  return utils.callApi(endpoint, requireAuthentication, additionalConfig)
    .then(response => handleApiResponse(response), error => handleApiError(error))
    .catch(ex => { throw ex; });
};
