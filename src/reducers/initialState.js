export default {
  entities  : {
    employee: {},
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
            message: "",
            status : 500
          }
        }
      }
    }
  }
};
