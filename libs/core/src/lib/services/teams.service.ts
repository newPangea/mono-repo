import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { TeamConvert, TeamInterface } from '@pang/interface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  readonly teamCollection = (queryFn?: QueryFn) => {
    const reference = this.db.firestore
      .collection(FIRESTORE_COLLECTION.team)
      .withConverter(TeamConvert);
    return this.db.collection<TeamInterface>(reference, queryFn);
  };

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {}

  add(team: TeamInterface) {
    return this.teamCollection().doc(team.key).set(team);
  }

  getMyTeams(owner: string) {
    return this.teamCollection((ref) =>
      ref.where('members', 'array-contains', owner).orderBy('createdAt', 'desc'),
    ).valueChanges();
  }
}
