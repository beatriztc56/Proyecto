import { applyMiddleware, combineReducers, createStore } from "redux";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return null;
    case "REGISTER":
      return action.user;
    case "CHANGEPASSWORD":
      return { ...state, user: action.user };
    case "EDIT":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

const errorReducer = (
  state = { message: "esto es un error de prueba" },
  action
) => {
  switch (action.type) {
    case "SET_ERROR":
      return { message: action.message };
    case "CLEAR_ERROR":
      return { message: null };
    default:
      return state;
  }
};

const historyReducer = (state = [], action) => {
  switch (action.type) {
    case "SEARCH":
      return [action.search, ...state].slice(0, 5);
    default:
      return state;
  }
};

const localStorageMiddleware = (store) => (next) => (action) => {
  let result = next(action);
  localStorage.setItem("session", JSON.stringify(store.getState()));
  return result;
};

const store = createStore(
  combineReducers({
    user: userReducer,
    history: historyReducer,
    error: errorReducer,
  }),
  JSON.parse(localStorage.getItem("session")) || {},
  applyMiddleware(localStorageMiddleware)
);

export default store;
