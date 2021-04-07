import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserAlgolia } from '@pang/interface';
import { School } from '@pang/models';

@Component({
  selector: 'pang-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  sLongitude;
  sLatitude;
  school: School;

  constructor(private route: ActivatedRoute, private router: Router) {}

  goToUser(user: UserAlgolia) {
    this.router.navigate(['/home/user/', user.uid]);
  }

  goToSchool(school: School) {
    this.school = school;
    this.sLatitude = this.school.latitude;
    this.sLongitude = this.school.longitude;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.sLatitude = params.sLatitude;
      this.sLongitude = params.sLongitude;
      console.log(this.sLatitude, this.sLongitude);
    });
  }
}
