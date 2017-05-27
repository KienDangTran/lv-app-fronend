import * as utils from '../utils/utils';

export default {
  session: {
    isLoggedIn: utils.isLoggedIn(),
    fetching: false,
    error: ''
  },
  entities: {
    employee: {},
    user: {}
  },
  pagination: {
    employee: {
      activePage: 1,
      pageSize: 10,
      pageCount: 1,
      fetching: false,
      pages: {
        1: {
          ids: [],
          error: {
            message: '',
            status: 500
          }
        }
      }
    },
    user: {
      activePage: 1,
      pageSize: 10,
      pageCount: 1,
      fetching: false,
      pages: {
        1: {
          ids: [],
          error: {
            message: '',
            status: 500
          }
        }
      }
    }
  }
};
