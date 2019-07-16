import React, { useEffect, useState } from "react";
import { Layout } from "../layout";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { GOOGLE_MAPS_API_KEY, getPlaces, CITY } from "./API";
import {MapContainer, MapPlaces, StyledMapWrapper, StyledSpan} from "./styles";
import Collapse from "antd/lib/collapse";
import { IPlace } from "./types";
const { Panel } = Collapse;

const MapComponent = () => <GoogleMap defaultZoom={11} defaultCenter={CITY} />;

const MapWrapper = withScriptjs(withGoogleMap(MapComponent));

export const Map: React.FC<{}> = () => {
  const [PHARMACY, setPHARMACY] = useState([]);
  const [GAS_STATION, setGAS_STATION] = useState([]);
  const [SCHOOL, setSCHOOL] = useState([]);
  const [RESTAURANT, setRESTAURANT] = useState([]);

  const callback = key => {
    console.log(key);
  };

  useEffect(() => {
    getPlaces("pharmacy").then(res => setPHARMACY(res));
    getPlaces("gas_station").then(res => setGAS_STATION(res));
    getPlaces("school").then(res => setSCHOOL(res));
    getPlaces("restaurant").then(res => setRESTAURANT(res));
  }, []);

  return (
    <Layout>
      <MapContainer>
        <StyledMapWrapper>
          <MapWrapper
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,place&key=${GOOGLE_MAPS_API_KEY}`}
            loadingElement={<div style={{ height: `93%` }} />}
            containerElement={<div style={{ height: `93%` }} />}
            mapElement={<div style={{ height: `93%` }} />}
          />
        </StyledMapWrapper>
        <MapPlaces>
          <Collapse onChange={callback}>
            <Panel header={"Pharmacies"} key="1">
              {PHARMACY.map((item: IPlace, index) => (
                <StyledSpan>
                  <h4 key={index}>
                    <i> {index + 1 + ") " + item.name}</i>
                  </h4>
                  <h6 key={index + 1}>{item.vicinity}</h6>
                </StyledSpan>
              ))}
            </Panel>
            <Panel header={"Schools"} key="2">
              {SCHOOL.map((item: IPlace, index) => (
                <StyledSpan>
                  <h4 key={index}>
                    <i> {index + 1 + ") " + item.name}</i>
                  </h4>
                  <h6 key={index + 1}>{item.vicinity}</h6>
                </StyledSpan>
              ))}
            </Panel>
            <Panel header={"Gas stations"} key="3">
              {GAS_STATION.map((item: IPlace, index) => (
                <StyledSpan>
                  <h4 key={index}>
                    <i> {index + 1 + ") " + item.name}</i>
                  </h4>
                  <h6 key={index + 1}>{item.vicinity}</h6>
                </StyledSpan>
              ))}
            </Panel>
            <Panel header={"Restaurants"} key="4">
              {RESTAURANT.map((item: IPlace, index) => (
                <StyledSpan>
                  <h4 key={index}>
                    <i> {index + 1 + ") " + item.name}</i>
                  </h4>
                  <h6 key={index + 1}>{item.vicinity}</h6>
                </StyledSpan>
              ))}
            </Panel>
          </Collapse>
        </MapPlaces>
      </MapContainer>
    </Layout>
  );
};
