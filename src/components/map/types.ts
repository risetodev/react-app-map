export interface IPlace {
  id: string;
  name: string;
  location: ILocation;
  vicinity: string;
}

interface ILocation {
  lat: number;
  lng: number;
}
