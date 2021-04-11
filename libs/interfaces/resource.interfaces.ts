import { ResourceType } from '../constants';
import * as firebase from 'firebase';

export interface ResourceInterface {
  uid: string;
  link?: string;
  ref?: string;
  url?: string;
  name: string;
  description?: string;
  public: boolean;
  owner: string;
  uploadBy: string;
  type: ResourceType;
  createAt: Date;
  updateAt: Date;
}

export const ResourceConvert = {
  toFirestore({ ...rest }: ResourceInterface): firebase.default.firestore.DocumentData {
    return { ...rest };
  },
  fromFirestore(
    snapshot: firebase.default.firestore.QueryDocumentSnapshot<ResourceInterface>,
    options: firebase.default.firestore.SnapshotOptions,
  ): ResourceInterface {
    const data = snapshot.data(options) as any;
    return {
      ...data,
      createAt: (data.createAt as firebase.default.firestore.Timestamp).toDate(),
      updateAt: (data.updateAt as firebase.default.firestore.Timestamp).toDate(),
    };
  },
};
