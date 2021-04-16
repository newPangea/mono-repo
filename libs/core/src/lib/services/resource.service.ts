import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore/interfaces';

import { first, map, switchMap } from 'rxjs/operators';

import { FIRESTORE_COLLECTION, ResourceType } from '@pang/const';
import { ResourceConvert, ResourceInterface } from '@pang/interface';
import { combineLatest, Observable } from 'rxjs';

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

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {}

  getMyResource(typeFile: ResourceType) {
    return this.auth.user.pipe(
      first(),
      switchMap(({ uid }) => this.getResources(uid, typeFile)),
    );
  }
  getResourceByKey(key: string) {
    return this.resourceCollection().doc(key).valueChanges();
  }

  getResources(owner: string, typeFile: ResourceType) {
    return this.auth.user.pipe(
      first(),
      switchMap(({ uid }) => {
        let directResource: Observable<ResourceInterface[]>;
        if (uid === owner) {
          directResource = this.resourceCollection((ref) =>
            ref.where('owner', '==', uid).where('type', '==', typeFile),
          ).valueChanges();
        } else {
          directResource = this.resourceCollection((ref) =>
            ref
              .where('owner', '==', owner)
              .where('type', '==', typeFile)
              .where('public', '==', true),
          ).valueChanges();
        }
        const indirectResources = this.resourceCollection((ref) =>
          ref
            .where('owner', '!=', owner)
            .where('type', '==', typeFile)
            .where('public', '==', true)
            .where('share', 'array-contains', owner),
        ).valueChanges();
        return combineLatest([directResource, indirectResources]).pipe(
          map(([item1, item2]) => [...item1, ...item2]),
        );
      }),
    );
  }
}
