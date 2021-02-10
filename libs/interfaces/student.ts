import { Country } from './';
import * as firebase from 'firebase/app';

export interface Student {
  uid: string;
  name: string;
  country: Country;
  date: Date;
  email: string;
  schoolCode: string;
  validateCode: boolean;
}

export const studentConvert = {
  toFirestore({ date, ...rest }: Student): firebase.default.firestore.DocumentData {
    return { ...rest, date: date.toString() };
  },
  fromFirestore(
    snapshot: firebase.default.firestore.QueryDocumentSnapshot<Student>,
    options: firebase.default.firestore.SnapshotOptions,
  ): Student {
    const data = snapshot.data(options)!;
    return { ...data, date: new Date(data.date) };
  },
};
