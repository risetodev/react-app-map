import { RouterState } from "connected-react-router";
import { IUser } from "./authorization/types";

export interface IRootReducer {
  router: RouterState;
  authorization: IUser;
}
