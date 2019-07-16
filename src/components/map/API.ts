import { IPlace } from "./types";
import axios from "axios";

export const GOOGLE_MAPS_API_KEY: string =
  "AIzaSyAsc_BpmdANMQiWNr6z3KGFp3j3ZBKyHv0";

const GOOGLEAPIES: string =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/";

export const PLACES: string[] = [
  "pharmacy",
  "gas_station",
  "school",
  "restaurant"
];

let bufPlaceData: IPlace = {
  id: null,
  name: null,
  location: { lat: null, lng: null },
  vicinity: null
};

export const CITY = {
  lat: 46.482525,
  lng: 30.723309
};

export const getPlaces = (place: string) =>
  // Make a request for a user with a given ID
  axios
    .get(
      `${GOOGLEAPIES}json?location=${CITY.lat},${CITY.lng}&radius=10000&type=${place}&key=${GOOGLE_MAPS_API_KEY}`
    )
    .then(response => {
      // handle success
     // console.log(response.data.results);
      return response.data.results.map(item => ({
        id: item.id,
        name: item.name,
        location: {
          lat: item.geometry.location.lat,
          lng: item.geometry.location.lng
        },
        vicinity: item.vicinity
      }));
    })
    .catch(function(error) {
      // handle error
      console.log(error);
      return [];
    });
