import initialState from './initialState';

/**
 * Creates a reducer managing pagination, given the action types to handle,
 * and a schema key telling how to extract the key from an action.
 * @param types
 * @param schemaKey
 * @returns {function(*=, *=)}
 */
const paginate = ({
  types,
  schemaKey
}) => {
  if (!Array.isArray(types) || types.length < 3) {
    throw new Error('Expected types to be an array of three elements.');
  }
  if (!types.every(t => typeof t === 'string')) {
    throw new Error('Expected types to be strings.');
  }
  if (typeof schemaKey !== 'string') {
    throw new Error('Expected schemaKey to be a string.');
  }

  const [requestType, successType, failureType, countType] = types;

  const updatePagination = (
    state = initialState.pagination[schemaKey],
    action
  ) => {
    switch (action.type) {
      case requestType:
        {
          return {
            ...state,
            activePage: action.pageNo,
            pageSize: action.pageSize,
            fetching: true
          };
        }
      case successType:
        {
          return {
            ...state,
            activePage: action.pageNo,
            pageSize: action.pageSize,
            fetching: false,
            pages: {
              ...state.pages,
              [action.pageNo]: {
                ids: action.payload.result
              }
            }
          };
        }
      case failureType:
        {
          return {
            ...state,
            fetching: false,
            pages: {
              ...state.pages,
              activePage: action.pageNo,
              pageSize: action.pageSize,
              fetching: false,
              [action.pageNo]: {
                error: action.payload.result
              }
            }
          };
        }
      case countType:
        {
          const pageSize = state.pageSize;
          return {
            ...state,
            pageCount: Math.ceil(action.payload.result / pageSize)
          };
        }
      default:
        return state;
    }
  };

  return (state = {}, action) => {
    // Update pagination by key
    switch (action.type) {
      case requestType:
      case successType:
      case failureType:
      case countType:
        if (typeof schemaKey !== 'string') {
          throw new Error('Expected key to be a string.');
        }
        return updatePagination(state, action);
      default:
        return state;
    }
  };
};

export default paginate;
