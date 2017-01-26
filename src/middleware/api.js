import callApi from "../api/agent";

/**
 * Action key that carries API call info interpreted by this Redux middleware.
 * @type {Symbol}
 */
export const CALL_API = Symbol("Call API");

/**
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 * @param store
 */
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === "undefined") {
    return next(action);
  }

  let { endpoint }        = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === "function") {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== "string") {
    throw new Error("Specify a string endpoint URL.");
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error("Expected an array of three action types.");
  }
  if (!types.every(type => typeof type === "string")) {
    throw new Error("Expected action types to be strings.");
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [ requestType, successType, failureType ] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema).then(
    response => next(
      actionWith(
        {
          type   : successType,
          payload: response
        }
      )
    ),
    error => next(
      actionWith(
        {
          type   : failureType,
          payload: error
        }
      )
    )
  );
};
