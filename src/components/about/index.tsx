import React from "react";
import {
  AboutLayout,
  Description,
  StyledAbout,
  StyledH1,
  StyledH2
} from "./styles";
import { LayoutComponent } from "../layoutComponent";

export const About: React.FC<{}> = () => {
  return (
    <LayoutComponent>
      <AboutLayout>
        <StyledAbout>
          <StyledH1>About author:</StyledH1>
          <Description>
            <span>My name is Ruslan Molchaniuk.</span>
            <br />
            <span>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Distinctio dolorem, eos excepturi libero magni minima nostrum
                odit officia quibusdam repellat sed voluptate. Adipisci,
                consequatur doloribus nobis omnis sint sit veniam.
              </span>
              <span>
                Accusamus accusantium consequatur esse fugiat odit. Ab
                accusantium architecto at delectus deserunt dolore dolorum eos,
                exercitationem facilis fugit in, ipsum laborum necessitatibus
                nobis odio qui, quo rem sed ut vel?
              </span>
              <span>
                Exercitationem harum illo ipsum nisi numquam praesentium soluta!
                Assumenda fugit id maxime nostrum numquam praesentium tenetur
                voluptas. At commodi culpa et, excepturi odit quos tenetur
                voluptas voluptatem! Libero, tempora, voluptates!
              </span>
            </span>
          </Description>
        </StyledAbout>
        <StyledAbout>
          <StyledH2>In this project, I used:</StyledH2>
          <ul>
            <li>React</li>
            <li>Redux</li>
            <li>React hooks</li>
            <li>Styled component</li>
            <li>React router</li>
            <li>UI library Antd</li>
          </ul>
        </StyledAbout>
      </AboutLayout>
    </LayoutComponent>
  );
};
