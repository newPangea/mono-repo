import * as functions from 'firebase-functions';
import { userIndex } from './utils/algolia-utils';
import * as admin from 'firebase-admin';

export const requestconnection = functions.firestore
  .document('connections/{id}')
  .onCreate(async (snapshot) => {
    const data = snapshot.data();
    const { from, to } = data;
    const [toUser, fromUser] = await Promise.all([
      userIndex.getObject<any>(to),
      userIndex.getObject<any>(from),
    ]);
    const msg =
      `${toUser.name} wants to connect with you, ` + 
      'check this user\'s profile here';
    return admin.messaging().sendToDevice(fromUser.token, {
      notification: {
        title: 'Request connection',
        body: msg,
      },
      data: {
        event: 'connection',
        to: toUser.uid,
      },
    });
  });
