import actionCreatorFactory from "typescript-fsa";
import { IUser } from "./types";

const actionCreator = actionCreatorFactory("Authorization");

export const authenticationAction = actionCreator<IUser>("ON_AUTHENTICATION");




