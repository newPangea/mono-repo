import * as functions from 'firebase-functions';
import { clientAlgolia } from './utils/algolia-utils';

export const userCreation = functions.firestore
  .document('user/{userId}')
  .onCreate((snapshot) => {
    const data = snapshot.data();
    const userIndex = clientAlgolia.initIndex('dev_USER');
    const userData = {
      ...data,
      objectID: data.uid,
      _geoloc: { lat: data.school.latitude, lng: data.school.longitude },
    };
    return userIndex.saveObject(userData).catch((err) => console.error(err));
  });

export const userUpdate = functions.firestore
  .document('user/{userId}')
  .onUpdate((change, context) => {
    const data = change.after.data();
    const userIndex = clientAlgolia.initIndex('dev_USER');
    return userIndex.partialUpdateObject({
      ...data,
      _geoloc: { lat: data.school?.latitude, lng: data.school?.longitude },
      objectID: context.params.userId,
    });
  });
