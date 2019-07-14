import React from "react";
import { Menu, Layout } from "antd";
import { Container, Row } from "./styles";

const { Header } = Layout;

export const LayoutComponent: React.FC<{}> = props => (
  <>
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{
          lineHeight: "64px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Menu.Item key="1">About</Menu.Item>
        <Menu.Item key="2">Map</Menu.Item>
        <Menu.Item key="3">Sign out</Menu.Item>
      </Menu>
    </Header>
    <Container>
      <Row>{props.children}</Row>
    </Container>
  </>
);
