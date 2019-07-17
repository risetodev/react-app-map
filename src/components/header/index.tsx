import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Menu, Layout } from "antd";
import { routes } from "../../Router/constans";
import { push } from "connected-react-router";
import { IRootReducer } from "../../Modules/types";
import { authenticationAction } from "../../Modules/authorization/actions";

const AntdHeader = Layout.Header;

const selector = (state: IRootReducer) => ({
  router: state.router,
  user: state.authorization.login
});

export const Header: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const { router, user } = useSelector(selector, shallowEqual);

  const handleSelect = ({ key }) => dispatch(push(key));

  return (
    <AntdHeader>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[router.location.pathname]}
        style={{
          lineHeight: "64px",
          display: "flex",
          justifyContent: "space-between"
        }}
        onSelect={handleSelect}
      >
        <Menu.Item key={routes.about}>About</Menu.Item>
        <Menu.Item key={routes.home}>Map</Menu.Item>
        <Menu.Item
          onClick={() => {
            dispatch(
              authenticationAction({
                login: null,
                password: null,
                loggedIn: false
              })
            );
            dispatch(push(routes.login));
          }}
          key={routes.login}
        >
          Sign out. Login: <i>{user}</i>
        </Menu.Item>
      </Menu>
    </AntdHeader>
  );
};
