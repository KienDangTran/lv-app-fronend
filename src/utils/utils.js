import axios from 'axios';
import * as endpoints from '../constants/endpoints';

export const JWT_TOKEN_EXPIRED = 11;
export const ACCESS_TOKEN = 'token';
export const REFRESH_TOKEN = 'refreshToken';

export function getJwtToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function getJwtRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN);
}

export function isLoggedIn() {
  return !!getJwtToken();
}

/**
 *
 ** Fetches an API response and normalizes the result JSON according to schema.
 * This makes every API response have the same shape, regardless of how nested it was.
 ** Response Schema:
 * <pre>
 * {
 *    // `data` is the response that was provided by the server
 *    data: {},
 *
 *    // `status` is the HTTP status code from the server response
 *    status: 200,
 *
 *    // `statusText` is the HTTP status message from the server response
 *    statusText: 'OK',
 *
 *    // `headers` the headers that the server responded with.
 *    // All header names are lower cased
 *    headers: {},
 *
 *    // `config` is the config that was provided to `axios` for the request
 *    config: {},
 *
 *    // `request` is the request that generated this response.
 *    // It is the last ClientRequest instance in node.js (in redirects)
 *    // and an XMLHttpRequest instance the browser
 *    request: {}
 * }
 * </pre>
 * @param endpoint - the server URL that will be used for the request
 * @param additionalConfig - https://github.com/mzabriskie/axios#request-config
 * @returns {Promise.<T>|Promise<R>}
 */
export function callApi(endpoint, requireAuthentication = true, additionalConfig = {}) {
  let headers = {
    ...additionalConfig.headers,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  };

  if (requireAuthentication) {
    const token = getJwtToken();
    if (token) {
      headers = {
        ...headers,
        'Authorization': `Bearer ${token}`
      };
    }
    else {
      throw 'Authentication Token not found!';
    }
  }

  return axios({
    url: endpoint,
    baseURL: endpoints.BASE_URL,
    headers: headers,
    ...additionalConfig
  });
}

/**
 * get new access token
 * @returns {Promise.<T>|Promise<R>}
 */
function refreshAccessToken() {
  const refreshToken = getJwtRefreshToken();
  if (!refreshToken) { return undefined; }

  return callApi(
    endpoints.REFRESH_TOKEN,
    false,
    { headers: { 'Authorization': `Bearer ${refreshToken}` } }
  );
}

export function refreshTokenThenCallAPI(endpoint, additionalConfig = {}) {
  return refreshAccessToken()
    .then(response => {
      localStorage.setItem(ACCESS_TOKEN, response.data.token);
      localStorage.setItem(REFRESH_TOKEN, response.data.refreshToken);
      callApi(endpoint, true, additionalConfig);
    },
    error => {
      throw error;
    })
    .catch(ex => { throw ex; });
}
