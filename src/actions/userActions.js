import {
  CALL_API
} from '../middleware/api';
import * as endpoint from '../constants/endpoints';
import schemas from '../constants/schemas';

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

const shouldFetchUsers = (state, pageNo, pageSize) => {
  const userPagination = state.pagination[schemas.EMPLOYEE.key];
  if(userPagination.fetching) {
    return false;
  } else if(!userPagination) {
    return true;
  } else if(!userPagination.pages) {
    return true;
  } else if(!userPagination.pages[pageNo]) {
    return true;
  } else if(userPagination.pageSize !== pageSize) {
    return true;
  } else {
    return !userPagination.pages[pageNo].ids ||
      userPagination.pages[pageNo].ids.length === 0;
  }
};

export const fetchUsers = (pageNo, pageSize) => {
  return(dispatch, getState) => {
    if(shouldFetchUsers(getState(), pageNo, pageSize)) {
      return dispatch(
        ({
          pageNo,
          pageSize,
          [CALL_API]: {
            types: [FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE],
            endpoint: `${endpoint.FETCH_USERS}?pageNo=${pageNo}&pageSize=${pageSize}`,
            schema: schemas.USER_ARRAY
          }
        })
      );
    }

    const {
      pagination: {
              [schemas.USER.key]: {
          pages: {
                  [pageNo]: {
              ids
            }
          }
        }
      }
    } = getState();

    return dispatch({
      type: FETCH_USERS_SUCCESS,
      pageNo,
      pageSize,
      payload: {
        result: ids
      }
    });
  };
};

export const COUNT_USERS = 'COUNT_USERS';
export const COUNT_USERS_SUCCESS = 'COUNT_USERS_SUCCESS';
export const COUNT_USERS_FAILURE = 'COUNT_USERS_FAILURE';

export const countUsers = () => {
  return(dispatch) => {
    return dispatch(
      ({
        [CALL_API]: {
          types: [COUNT_USERS, COUNT_USERS_SUCCESS, COUNT_USERS_FAILURE],
          endpoint: endpoint.COUNT_USERS
        }
      })
    );
  };
};
