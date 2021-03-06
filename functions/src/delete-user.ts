import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import algoliasearch from 'algoliasearch';

const client = algoliasearch(
  functions.config().algolia.app_id,
  functions.config().algolia.api_key
);

export const deleteUSer = functions.firestore
  .document('user/{userId}')
  .onDelete((snapshot, context) => {
    const key = context.params.userId;
    const userIndex = client.initIndex('dev_USER');
    userIndex.deleteObject(key);
    return admin.auth().deleteUser(key);
  });
