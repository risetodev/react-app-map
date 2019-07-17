import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { rootReducer } from "./rootReducer";
import { history } from "../Router/history";
import { IRootReducer } from "./types";
import { getAuthentication } from "../utils/localStorage";

const persistedState = {
  authorization: {
    ...getAuthentication()
  }
};

export const configureStore = () => {
  const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore<IRootReducer, any, any, any>(
    rootReducer(history),
    persistedState,
    composeEnhancers(applyMiddleware(routerMiddleware(history)))
  );

  return store;
};
