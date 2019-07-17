export interface IPlace {
  id: string;
  icon: string;
  name: string;
  location: ILocation;
  vicinity: string;
}

export interface ILocation {
  lat: number;
  lng: number;
}
