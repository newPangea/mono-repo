import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { Team } from '@pang/models';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  public didLogout: EventEmitter<void> = new EventEmitter();

  readonly teamCollection = (queryFn?: QueryFn) => {
    const reference = this.db.firestore.collection(FIRESTORE_COLLECTION.team);
    return this.db.collection<Team>(reference, queryFn);
  };

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {}

  add(team: Team) {
    return this.db.collection(FIRESTORE_COLLECTION.team).doc(team.key).set(Object.assign({}, team));
  }

  getMyTeams(owner: string) {
    return this.teamCollection((ref) =>
      ref.where('members', 'array-contains', owner).orderBy('createdAt', 'desc'),
    ).valueChanges();
  }
}
