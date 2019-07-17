import { ILocation, IPlace } from "./types";
import axios from "axios";

export const GOOGLE_MAPS_API_KEY: string =
  "AIzaSyAsc_BpmdANMQiWNr6z3KGFp3j3ZBKyHv0";

const GOOGLEAPIES: string =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/";


export const getPlaces = (place: string, center: ILocation) => {
  //console.log(center);
  // Make a request for a user with a given ID
  return axios
    .get(
      `${GOOGLEAPIES}json?location=${center.lat},${center.lng}&radius=5000&type=${place}&key=${GOOGLE_MAPS_API_KEY}`
    )
    .then(response => {
      // handle success
      //console.log(response.data.results);
      return response.data.results.map(item => ({
        id: item.id,
        icon: item.icon,
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
};
