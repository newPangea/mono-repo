import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore/interfaces';

import { FIRESTORE_COLLECTION } from '@pang/const';
import { ResourceConvert, ResourceInterface } from '@pang/interface';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  readonly resourceCollection = (queryFn?: QueryFn) => {
    const reference = this.db.firestore
      .collection(FIRESTORE_COLLECTION.resource)
      .withConverter(ResourceConvert);
    return this.db.collection<ResourceInterface>(reference, queryFn);
  };

  constructor(private db: AngularFirestore) {}
}
