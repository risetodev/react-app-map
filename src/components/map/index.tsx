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
  const [geolocation, setGeolocation] = useState();
  const [isLocated, setIsLocated] = useState(false);
  const [pharmacy, setPharmacy] = useState([]);
  const [gasStation, setGasStation] = useState([]);
  const [school, setSchool] = useState([]);
  const [restaurant, setRestaurant] = useState([]);
  const [dataToShow, setDataToShow] = useState([]);
  //Set of markers
  const [markers, setMarkers] = useState<ILocation | any>([]);
  const [isMarkersVisible, setIsMarkersVisible] = useState<boolean>(true);

  const getCurrentLocationData = currentLocation => {
    getPlaces("pharmacy", currentLocation).then(res => setPharmacy(res));
    getPlaces("gas_station", currentLocation).then(res => setGasStation(res));
    getPlaces("school", currentLocation).then(res => setSchool(res));
    getPlaces("restaurant", currentLocation).then(res => setRestaurant(res));
  };

  const deleteMarker = marker => {
    setMarkers(
      markers.filter(
        item =>
          item.lat !== marker.latLng.lat() && item.lng !== marker.latLng.lng()
      )
    );
  };

  const setMarker = props => {
    isMarkersVisible &&
      setMarkers([
        ...markers,
        {
          lat: props.latLng.lat(),
          lng: props.latLng.lng()
        }
      ]);
  };

  const onSelectPanel = key => {
    if (key === undefined) {
      setDataToShow([]);
      return;
    }
    switch (key.toLocaleString()) {
      case "pharmacy":
        setDataToShow(pharmacy);
        break;
      case "gas_station":
        setDataToShow(gasStation);
        break;
      case "school":
        setDataToShow(school);
        break;
      case "restaurant":
        setDataToShow(restaurant);
        break;
    }
  };

  const handelFunctionality = value => {
    switch (value.target.value) {
      case "Save":
        if (markers.length === 0) {
          alert("There are no markers to save!");
        } else if (markers.length > 0) {
          setIsMarkersVisible(false);
          alert("Successfully saved!");
        }
        break;
      case "Show":
        setIsMarkersVisible(true);
        markers.length === 0 && alert("There are no markers to show!");
        break;
      case "Delete":
        if (markers.length === 0) {
          alert("There are no markers to delete!");
        } else {
          setMarkers([]);
          setGeolocation([]);
          alert("Successfully deleted!");
          setDataToShow([]);
          setIsMarkersVisible(true);
        }
        break;
    }
  };

  const getMyLocation = () => {
    setIsLocated(true);
    navigator.geolocation.getCurrentPosition(position => {
      setMarkers([
        ...markers,
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
    setIsLocated(false);
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
    getCurrentLocationData(markers[0] || geolocation);
  }, [geolocation, markers]);

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
              markers.map((item: ILocation, index) => (
                <Marker
                  key={index}
                  onClick={deleteMarker}
                  position={{ lat: item.lat, lng: item.lng }}
                />
              ))}
            {dataToShow.length !== 0 &&
              dataToShow.map(item => (
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
          {markers.length === 1 && (
            <Collapse accordion={true} onChange={onSelectPanel}>
              <Panel header={"Pharmacies"} key="pharmacy">
                {pharmacy.map((item: IPlace, index) => (
                  <StyledSpan key={index}>
                    <h4>
                      <i> {index + 1 + ") " + item.name}</i>
                    </h4>
                    <h6>{item.vicinity}</h6>
                  </StyledSpan>
                ))}
              </Panel>
              <Panel header={"Schools"} key="school">
                {school.map((item: IPlace, index) => (
                  <StyledSpan key={index}>
                    <h4>
                      <i> {index + 1 + ") " + item.name}</i>
                    </h4>
                    <h6>{item.vicinity}</h6>
                  </StyledSpan>
                ))}
              </Panel>
              <Panel header={"Gas stations"} key="gas_station">
                {gasStation.map((item: IPlace, index) => (
                  <StyledSpan key={index}>
                    <h4>
                      <i> {index + 1 + ") " + item.name}</i>
                    </h4>
                    <h6>{item.vicinity}</h6>
                  </StyledSpan>
                ))}
              </Panel>
              <Panel header={"Restaurants"} key="restaurant">
                {restaurant.map((item: IPlace, index) => (
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
