import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router";
import { Authorization } from "../components/authorization";
import { routes } from "./constans";
import { NotFound } from "../components/notFound";
import { Map } from "../components/map";
import { About } from "../components/about";
import { PrivateRoute } from "./privateRouter";

export const Router: React.FC<{ history: History }> = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact={true}
          path={routes.login}
          component={Authorization}
        />
        <PrivateRoute exact={true} path={routes.home} component={Map} />
        <PrivateRoute exact={true} path={routes.about} component={About} />
        <Route exact={true} path={routes.notFound} component={NotFound} />
      </Switch>
    </ConnectedRouter>
  );
};
