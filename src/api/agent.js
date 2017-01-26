import fetch from "../../mock-api";
import { normalize } from "normalizr";
const API_ROOT = "";

/**
 * Fetches an API response and normalizes the result JSON according to schema.
 * This makes every API response have the same shape, regardless of how nested it was.
 * @param endpoint
 * @param schema
 * @returns {*|Promise.<TResult>}
 */
const callApi = (endpoint, schema) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? `${API_ROOT}${endpoint}` : endpoint;
  return fetch(fullUrl)
    .then(
      response => {
        if (schema) {
          return Object.assign({}, normalize(response, schema));
        }
        return response;
      }
    )
    .catch(
      error => {
        throw new Error(error);
      }
    );
};

export default callApi;
