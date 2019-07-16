import styled from "styled-components";

export const MapContainer = styled.div`
  display: flex;
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

export const StyledPanel = styled.div`
  height: 100vh;
`;

export const StyledSpan = styled.span`
  cursor: pointer;
`;
