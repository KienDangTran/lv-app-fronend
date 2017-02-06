export default {
  session   : {
    isAuthenticated: !!sessionStorage.getItem('jwt')
  },
  entities  : {
    employee: {},
    user    : {}
  },
  pagination: {
    employee: {
      activePage: 1,
      pageSize  : 10,
      pageCount : 1,
      fetching  : false,
      pages     : {
        1: {
          ids  : [],
          error: {
            message: '',
            status : 500
          }
        }
      }
    },
    user    : {
      activePage: 1,
      pageSize  : 10,
      pageCount : 1,
      fetching  : false,
      pages     : {
        1: {
          ids  : [],
          error: {
            message: '',
            status : 500
          }
        }
      }
    }
  }
};
