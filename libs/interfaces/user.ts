import { Country, Preference } from './';
import * as firebase from 'firebase/app';
import { School } from '../models';

export interface User {
  uid: string;
  name: string;
  country: Country;
  date: Date;
  email: string;
  schoolCode: string;
  validateCode: boolean;
  code: string;
  school?: School;
  preferences?: Preference[];
  preferencesKey?: string[];
  bio?: string;
  imgUrl?: string;
  token?: string;
}

export const userConvert = {
  toFirestore({ ...rest }: User): firebase.default.firestore.DocumentData {
    return { ...rest };
  },
  fromFirestore(
    snapshot: firebase.default.firestore.QueryDocumentSnapshot<User>,
    options: firebase.default.firestore.SnapshotOptions,
  ): User {
    const data = snapshot.data(options) as any;
    return { ...data, date: (data.date as firebase.default.firestore.Timestamp).toDate() };
  },
};
