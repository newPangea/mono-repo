import { Country } from './';
import * as firebase from 'firebase/app';

export interface User {
  uid: string;
  name: string;
  country: Country;
  date: Date;
  email: string;
  schoolCode: string;
  validateCode: boolean;
  code: string;
}

export const userConvert = {
  toFirestore({ date, ...rest }: User): firebase.default.firestore.DocumentData {
    return { ...rest, date: date.toString() };
  },
  fromFirestore(
    snapshot: firebase.default.firestore.QueryDocumentSnapshot<User>,
    options: firebase.default.firestore.SnapshotOptions,
  ): User {
    const data = snapshot.data(options)!;
    return { ...data, date: new Date(data.date) };
  },
};
