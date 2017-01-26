import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import api from "../middleware/api";
import rootReducer from "../reducers";

const configureStore = (initialState) => {
  const middlewares = [
    thunkMiddleware,
    api
  ];

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
};

export default configureStore;
