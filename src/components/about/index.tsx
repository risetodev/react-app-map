import React from "react";
import {
  AboutLayout,
  Description,
  StyledAbout,
  StyledH1,
  StyledH2
} from "./styles";
import { Layout } from "../layout";

export const About: React.FC<{}> = () => {
  return (
    <Layout>
      <AboutLayout>
        <StyledAbout>
          <StyledH1>About author:</StyledH1>
          <Description>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
            corporis ipsa maiores nam qui. Alias cupiditate fuga, illum iste
            laborum neque rerum vel vero! Architecto delectus facilis omnis? At,
            officia!
          </Description>
        </StyledAbout>
        <StyledAbout>
          <StyledH2>In this project, I used:</StyledH2>
          <ul>
            <li>React</li>
            <li>Redux</li>
            <li>Styled component</li>
            <li>React router</li>
            <li>UI library Antd</li>
            <li>Local storage</li>
            <li>react-google-maps</li>
            <li>Google Places API</li>
            <li>Google Maps API</li>
            <li>
              <b>
                <i>Must have:</i>
                <a
                  target={"_blank"}
                  href={
                    " https://chrome.google.com/webstore/detail/moesif-orign-cors-changer/digfbfaphojjndkpccljibejjbppifbc"
                  }
                >
                  Extension in Chrome
                </a>{" "}
                to avoid Cross Origin Errors: Moesif Orign & CORS Changer
              </b>
              <br />
            </li>
          </ul>
        </StyledAbout>
      </AboutLayout>
    </Layout>
  );
};
