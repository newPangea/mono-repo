import * as functions from 'firebase-functions';
import algoliasearch from 'algoliasearch';
import * as _ from 'lodash';

export const userCreation = functions.firestore
  .document('user/{userId}')
  .onCreate((snapshot) => {
    const data = snapshot.data();
    const client = algoliasearch(
      functions.config().algolia.app_id,
      functions.config().algolia.api_key
    );
    const userIndex = client.initIndex('dev_USER');
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
    const dataAfter = change.after.data();
    const dataBefore = change.before.data();
    const diff = difference(dataAfter, dataBefore);
    const client = algoliasearch(
      functions.config().algolia.app_id,
      functions.config().algolia.api_key
    );
    const userIndex = client.initIndex('dev_USER');
    return userIndex.partialUpdateObject({
      ...diff,
      objectID: context.params.userId,
    });
  });

const difference = (object: any, base: any) => {
  const changes = (object2: any, base2: any) => {
    return _.transform(object2, (result: any, value: any, key: string) => {
      if (!_.isEqual(value, base2[key])) {
        result[key] =
          _.isObject(value) && _.isObject(base2[key]) ?
          changes(value, base2[key]) :
          value;
      }
    });
  };
  return changes(object, base);
};
