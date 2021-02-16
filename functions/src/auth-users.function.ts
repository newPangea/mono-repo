import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const isActiveAuthUser = functions.https.onCall(
  (data: { uid: string }) => {
    return admin
      .auth()
      .getUser(data.uid)
      .then((user) => !user.disabled);
  }
);

export const enableOrDisableAuthUser = functions.https.onCall(
  (data: { uid: string; enabled: boolean }) => {
    return admin.auth().updateUser(data.uid, { disabled: !data.enabled });
  }
);
