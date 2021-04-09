import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { QueryFn } from '@angular/fire/firestore/interfaces';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { ResourceInterface } from '@pang/interface';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  readonly resourceCollection = (queryFn?: QueryFn) =>
    this.db.collection<ResourceInterface>(FIRESTORE_COLLECTION.resource, queryFn);

  constructor(private db: AngularFirestore) {}
}
