import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../layout";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from "react-google-maps";
import { getPlaces, GOOGLE_MAPS_API_KEY } from "./API";
import {
  FunctionsButtons,
  MapContainer,
  MapPlaces,
  StyledMapWrapper,
  StyledSpan
} from "./styles";
import Collapse from "antd/lib/collapse";
import { IPlace, ILocation } from "./types";
import { Button } from "antd";
import ButtonGroup from "antd/lib/button/button-group";
const { Panel } = Collapse;

const MapComponent = props => (
  <GoogleMap defaultZoom={12} {...props}>
    {props.children}
  </GoogleMap>
);

const MapWrapper = withScriptjs(withGoogleMap(MapComponent));

export const Map: React.FC<{}> = () => {
  //Geolocation
  const [geolocation, setGeolocation] = useState<ILocation | any>();
  const [isLocated, setIsLocatied] = useState<boolean>(false);
  const [PHARMACY, setPHARMACY] = useState<IPlace | any>([]);
  const [GAS_STATION, setGAS_STATION] = useState<IPlace | any>([]);
  const [SCHOOL, setSCHOOL] = useState<IPlace | any>([]);
  const [RESTAURANT, setRESTAURANT] = useState<IPlace | any>([]);
  const [DATA_TO_SHOW, setDATA_TO_SHOW] = useState<IPlace | any>([]);
  //Set of markers
  const [MARKERS, setMARKERS] = useState<ILocation | any>([]);
  const [isMarkersVisible, setIsMarkersVisible] = useState<boolean>(true);

  const getCurrentLocationData = currentLocation => {
    getPlaces("pharmacy", currentLocation).then(res => setPHARMACY(res));
    getPlaces("gas_station", currentLocation).then(res => setGAS_STATION(res));
    getPlaces("school", currentLocation).then(res => setSCHOOL(res));
    getPlaces("restaurant", currentLocation).then(res => setRESTAURANT(res));
  };

  const deleteMarker = marker => {
    setMARKERS(
      MARKERS.filter(
        item =>
          item.lat !== marker.latLng.lat() && item.lng !== marker.latLng.lng()
      )
    );
  };

  const setMarker = props => {
    isMarkersVisible &&
      setMARKERS([
        ...MARKERS,
        {
          lat: props.latLng.lat(),
          lng: props.latLng.lng()
        }
      ]);
  };

  const onSelectPanel = key => {
    if (key === undefined) {
      setDATA_TO_SHOW([]);
      return;
    }
    switch (key.toLocaleString()) {
      case "pharmacy":
        setDATA_TO_SHOW(PHARMACY);
        break;
      case "gas_station":
        setDATA_TO_SHOW(GAS_STATION);
        break;
      case "school":
        setDATA_TO_SHOW(SCHOOL);
        break;
      case "restaurant":
        setDATA_TO_SHOW(RESTAURANT);
        break;
    }
  };

  const handelFunctionality = value => {
    switch (value.target.value) {
      case "Save":
        if (MARKERS.length === 0) {
          alert("There are no markers to save!");
        } else if (MARKERS.length > 0) {
          setIsMarkersVisible(false);
          alert("Successfully saved!");
        }
        break;
      case "Show":
        setIsMarkersVisible(true);
        MARKERS.length === 0 && alert("There are no markers to show!");
        break;
      case "Delete":
        if (MARKERS.length === 0) {
          alert("There are no markers to delete!");
        } else {
          setMARKERS([]);
          setGeolocation([]);
          alert("Successfully deleted!");
          setDATA_TO_SHOW([]);
          setIsMarkersVisible(true);
        }
        break;
    }
  };

  const getMyLocation = () => {
    setIsLocatied(true);
    navigator.geolocation.getCurrentPosition(position => {
      setMARKERS([
        ...MARKERS,
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      ]);
      setGeolocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
    setIsLocatied(false);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setGeolocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    });
  }, []);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    getCurrentLocationData(MARKERS[0] || geolocation);
  }, [geolocation, MARKERS]);

  return (
    <Layout>
      <MapContainer>
        <StyledMapWrapper>
          <MapWrapper
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,place&key=${GOOGLE_MAPS_API_KEY}`}
            loadingElement={<div style={{ height: `93%` }} />}
            containerElement={<div style={{ height: `93%` }} />}
            mapElement={<div style={{ height: `93%` }} />}
            onClick={setMarker}
            defaultCenter={geolocation && geolocation}
          >
            {isMarkersVisible &&
              MARKERS.map((item: ILocation, index) => (
                <Marker
                  key={index}
                  onClick={deleteMarker}
                  position={{ lat: item.lat, lng: item.lng }}
                />
              ))}
            {DATA_TO_SHOW.length !== 0 &&
              DATA_TO_SHOW.map(item => (
                <Marker
                  key={item.id}
                  position={{ lat: item.location.lat, lng: item.location.lng }}
                  // icon={{
                  //   url: item.icon,
                  //   // @ts-ignore
                  //   scaledSize: new window.google.maps.Size(25, 25)
                  // }}
                />
              ))}
          </MapWrapper>
        </StyledMapWrapper>
        <MapPlaces>
          <div>
            <h3>
              <i>Second click on the marker - delete it</i>
            </h3>
          </div>
          <FunctionsButtons>
            <ButtonGroup>
              <Button onClick={handelFunctionality} value={"Save"}>
                Save
              </Button>
              <Button onClick={handelFunctionality} value={"Show"}>
                Show
              </Button>
              <Button onClick={handelFunctionality} value={"Delete"}>
                Delete
              </Button>
              <Button
                type="primary"
                icon={"environment"}
                loading={isLocated}
                onClick={getMyLocation}
              />
            </ButtonGroup>
          </FunctionsButtons>
          {MARKERS.length === 1 && (
            <Collapse accordion={true} onChange={onSelectPanel}>
              <Panel header={"Pharmacies"} key="pharmacy">
                {PHARMACY.map((item: IPlace, index) => (
                  <StyledSpan key={index}>
                    <h4>
                      <i> {index + 1 + ") " + item.name}</i>
                    </h4>
                    <h6>{item.vicinity}</h6>
                  </StyledSpan>
                ))}
              </Panel>
              <Panel header={"Schools"} key="school">
                {SCHOOL.map((item: IPlace, index) => (
                  <StyledSpan key={index}>
                    <h4>
                      <i> {index + 1 + ") " + item.name}</i>
                    </h4>
                    <h6>{item.vicinity}</h6>
                  </StyledSpan>
                ))}
              </Panel>
              <Panel header={"Gas stations"} key="gas_station">
                {GAS_STATION.map((item: IPlace, index) => (
                  <StyledSpan key={index}>
                    <h4>
                      <i> {index + 1 + ") " + item.name}</i>
                    </h4>
                    <h6>{item.vicinity}</h6>
                  </StyledSpan>
                ))}
              </Panel>
              <Panel header={"Restaurants"} key="restaurant">
                {RESTAURANT.map((item: IPlace, index) => (
                  <StyledSpan key={index}>
                    <h4>
                      <i> {index + 1 + ") " + item.name}</i>
                    </h4>
                    <h6>{item.vicinity}</h6>
                  </StyledSpan>
                ))}
              </Panel>
            </Collapse>
          )}
        </MapPlaces>
      </MapContainer>
    </Layout>
  );
};
