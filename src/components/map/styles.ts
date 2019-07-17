import styled from "styled-components";

export const MapContainer = styled.div`
  display: flex;
  margin-top: 1em;
`;

export const StyledMapWrapper = styled.div`
  width: 70vw;
  height: 100vh;
`;

export const MapPlaces = styled.div`
  width: 30vw;
  height: 100vh;
  margin: 0.5em 0 0 1em;
  .ant-collapse-content-box {
    height: 50vh;
    overflow: auto;
  }
`;

export const FunctionsButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
`;

export const StyledSpan = styled.span`
  cursor: pointer;
`;
