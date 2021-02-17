import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FIRESTORE_COLLECTION } from '@pang/const';
import { User } from '@pang/interface';
import { School } from '@pang/models';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'new-pangea-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['avatar', 'name', 'school', 'connections', 'teams', 'details'];
  dataSource = new MatTableDataSource<User>();
  schools$: Observable<School[]>;
  private usersSubscription: Subscription;

  constructor(private fireStore: AngularFirestore) {}

  ngOnInit(): void {
    this.usersSubscription = this.getAllStudents().subscribe((users) => {
      this.dataSource.data = users;
    });
    this.schools$ = this.getAllSchools();
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getSchoolAttributeValue(schoolCode: string, schools: School[], attribute: string) {
    const schoolFound = (schools || []).find(
      (school) =>
        school.scode === schoolCode ||
        school.tcode === schoolCode ||
        school.pcode === schoolCode ||
        school.acode === schoolCode ||
        school.ecode === schoolCode,
    );
    return !!schoolFound ? schoolFound[attribute] : null;
  }

  private getAllSchools() {
    return this.fireStore
      .collection<School>(FIRESTORE_COLLECTION.school, (ref) => ref.orderBy('name'))
      .valueChanges();
  }

  private getAllStudents() {
    return this.fireStore
      .collection<User>(FIRESTORE_COLLECTION.user, (ref) => ref.orderBy('name'))
      .valueChanges();
  }
}
