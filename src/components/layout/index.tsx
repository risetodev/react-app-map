import React from "react";

import { Container, Row } from "./styles";
import { Header } from "../header";

export const Layout: React.FC<{}> = props => (
  <>
    <Header />
    <Container>
      <Row>{props.children}</Row>
    </Container>
  </>
);
