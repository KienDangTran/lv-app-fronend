import * as ActionType from "./actionTypes";

/**
 *
 * @param endpoint - the paginated endpoint
 * @param page
 */
export const requestPage = (endpoint, page) => ({
  type   : ActionType.REQUEST_PAGE,
  payload: { page }
});

/**
 *
 * @param endpoint - the paginated endpoint
 * @param page
 */
export const receivePage = (endpoint, page) => ({
  type   : ActionType.RECEIVE_PAGE,
  meta   : { endpoint },
  payload: { page }
});
