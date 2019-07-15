import React from "react";
import "antd/dist/antd.css";
import { Provider } from "react-redux";
import { configureStore } from "../../Modules/configureStore";
import { Router } from "../../Router";
import { history } from "../../Router/history";

const store = configureStore();

export const App: React.FC<{}> = () => (
  <Provider store={store}>
    <Router history={history} />
  </Provider>
);
