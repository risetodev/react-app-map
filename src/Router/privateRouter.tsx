import React from "react";
import { Redirect, Route } from "react-router";
import { routes } from "./constans";
import { IRootReducer } from "../Modules/types";
import { shallowEqual, useSelector } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const selector = (state: IRootReducer) => ({
    authorization: state.authorization
  });

  const { authorization } = useSelector(selector, shallowEqual);

  return (
    <Route
      {...rest}
      render={props =>
        authorization.loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={routes.login} />
        )
      }
    />
  );
};
