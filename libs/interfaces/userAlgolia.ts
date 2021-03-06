import { User } from './user';

export interface UserAlgolia extends User {
  objectID: string;
  _geoloc: {
    lat: number;
    lng: number;
  };
}
