import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { clientAlgolia } from './utils/algolia-utils';

export const deleteUSer = functions.firestore
  .document('user/{userId}')
  .onDelete((snapshot, context) => {
    const key = context.params.userId;
    const userIndex = clientAlgolia.initIndex(
      functions.config().algolia.user_index
    );
    userIndex.deleteObject(key);
    return admin.auth().deleteUser(key);
  });
