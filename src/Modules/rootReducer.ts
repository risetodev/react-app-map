import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { IRootReducer } from "./types";
import { reducer as authorization } from "./authorization/reducer";

export const rootReducer = history =>
  combineReducers<IRootReducer>({
    router: connectRouter(history),
    authorization
  });
