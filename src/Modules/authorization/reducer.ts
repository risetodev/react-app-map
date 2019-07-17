import { reducerWithInitialState } from "typescript-fsa-reducers";
import { IUser } from "./types";
import { authenticationAction } from "./actions";
import { setAuthentication } from "../../utils/localStorage";

const INITIAL_STATE: IUser = {
  login: null,
  password: null,
  loggedIn: false
};

export const reducer = reducerWithInitialState<IUser>(INITIAL_STATE).case(
  authenticationAction,
  (state: IUser, payload) => {
    setAuthentication({ loggedIn: payload.loggedIn, login: payload.login });
    return { ...state, ...payload };
  }
);
