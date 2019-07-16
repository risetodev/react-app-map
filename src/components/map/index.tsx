import React from "react";
import { Layout } from "../layout";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { GOOGLE_MAPS_API_KEY } from "./API";

const MapComponent = () => (
  <GoogleMap
    defaultZoom={11}
    defaultCenter={{
      lat: 46.482525,
      lng: 30.723309
    }}
  />
);

const MapWrapper = withScriptjs(withGoogleMap(MapComponent));

export const Map: React.FC<{}> = () => {
  return (
    <Layout>
      <MapWrapper
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,place&key=${GOOGLE_MAPS_API_KEY}`}
        loadingElement={<div style={{ height: `95%` }} />}
        containerElement={<div style={{ height: `95%` }} />}
        mapElement={<div style={{ height: `95%` }} />}
      />
    </Layout>
  );
};
