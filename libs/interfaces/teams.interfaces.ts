import * as firebase from 'firebase';

export interface TeamInterface {
  key: string;
  name: string;
  members: string[];
  updatedAt?: Date;
  createdAt: Date;
}

export const TeamConvert = {
  toFirestore({ ...rest }: TeamInterface): firebase.default.firestore.DocumentData {
    return { ...rest };
  },
  fromFirestore(
    snapshot: firebase.default.firestore.QueryDocumentSnapshot<TeamInterface>,
    options: firebase.default.firestore.SnapshotOptions,
  ): TeamInterface {
    const data = snapshot.data(options) as any;
    return {
      ...data,
      createdAt: (data.createdAt as firebase.default.firestore.Timestamp).toDate(),
      updatedAt: data.updatedAt
        ? (data.updatedAt as firebase.default.firestore.Timestamp).toDate()
        : null,
    };
  },
};
