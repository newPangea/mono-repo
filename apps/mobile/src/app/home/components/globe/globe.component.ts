import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@pang/core';
import { User } from '@pang/interface';

import { Subscription } from 'rxjs';

import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import * as versor from 'versor';

@Component({
  selector: 'pang-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss'],
})
export class GlobeComponent implements OnInit, OnDestroy, OnChanges {
  @Input() user: User;

  usersSubscription: Subscription;
  users: User[] = [];
  schoolLocations: any[];

  //implementing 3d globe
  rotationDelay = 3000;
  // scale of the globe (not the canvas element)
  scaleFactor = 0.8;
  // autorotation speed
  degPerSec = 6;
  // start angles
  angles = { x: -20, y: 40, z: 0 };
  // colors
  colorWater = '#fff';
  colorLand = 'blue';
  colorGraticule = '#ccc';
  colorCountry = '#a00';

  //for function use
  countryList;
  locations;
  markerGroup;
  markers;
  current;
  canvas;
  water;
  gdistance;
  coordinate;
  graticule;
  center;
  v0; // Mouse position in Cartesian coordinates at start of drag gesture.
  r0; // Projection rotation as Euler angles at start.
  q0; // Projection rotation as versor at start.
  v1;
  q1;
  r1;
  n;
  p;
  x0;
  y0;
  x1;
  y1;
  y;
  inside;
  a0;
  c;
  l;
  coords: any;

  public lastTime = d3.now();

  degPerMs;
  land;
  autorotate;
  now;
  diff;
  roation;
  currentCountry;
  rotation;
  pos;
  //end implementation 3d globe

  context;
  svg;
  world: any;
  countries: any;

  height;
  width;
  flag = true;
  g;

  circles;
  yLabel;
  x;
  xAxisGroup;
  yAxisGroup;

  projection;
  path;
  geoGenerator;
  markersPathString;
  isLoading;
  hidden = true;

  constructor(private userService: UserService, private routrer: Router) {}

  ngOnInit() {
    this.isLoading = true;
    this.usersSubscription = this.userService.getAll().subscribe((users) => {
      this.schoolLocations = [];
      this.users = users;
      this.users.forEach((user) => {
        if (user.school && user.school?.latitude) {
          this.schoolLocations.push([user.school?.longitude, user.school?.latitude]);
        }
      });
      this.height = 300;
      this.width = 300;
      this.coords = {
        type: 'MultiPoint',
        coordinates: this.schoolLocations,
      };
      this.center = [this.width / 2, this.height / 2];
      this.current = d3.select('#current');
      this.canvas = d3.select('#globe');

      this.context = this.canvas.node().getContext('2d');
      this.water = { type: 'Sphere' };
      this.projection = d3.geoOrthographic().precision(0.1);
      this.path = d3.geoPath(this.projection).context(this.context);

      this.graticule = d3.geoGraticule();
      this.degPerMs = this.degPerSec / 1000;

      this.loadData();

      d3.select(this.context.canvas)
        .call(
          this.drag(this.projection)
            .on('drag.render', () => this.render(this.land))
            .on('end.render', () => this.render(this.land)),
        )
        .call(() => this.render(this.countries))
        .node();

      d3.select(self.frameElement).style('height', this.height + 'px');
    });
  }

  ngOnChanges() {
    if (this.user) {
      this.routrer.navigate(['/home/user/', this.user.uid]);
    }
  }

  setAngles() {
    this.rotation = this.projection.rotate();
    this.rotation[0] = this.angles.y;
    this.rotation[1] = this.angles.x;
    this.rotation[2] = this.angles.z;
    this.projection.rotate(this.rotation);
  }

  scale() {
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;
    this.canvas.attr('width', this.width).attr('height', this.height);
    this.projection
      .scale((this.scaleFactor * Math.min(this.width - 20, this.height - 20)) / 2)
      .translate([this.width / 2, this.height / 2]);
    this.render(this.land);
    this.isLoading = false;
    this.hidden = false;
  }

  fill(obj, color) {
    this.context.beginPath();
    this.path(obj);
    this.context.fillStyle = color;
    this.context.fill();
  }

  stroke(obj, color) {
    this.context.beginPath();
    this.path(obj);
    this.context.strokeStyle = color;
    this.context.stroke();
  }

  render(land) {
    this.path.pointRadius((this.scaleFactor * Math.min(this.width - 20, this.height - 100)) / 30);
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.beginPath(),
      this.path(this.water),
      (this.context.fillStyle = '#00d8f9'),
      this.context.fill();
    this.context.beginPath(),
      this.path(land),
      (this.context.fillStyle = '#00b0f0'),
      this.context.fill();
    this.context.beginPath(),
      this.path(land),
      (this.context.strokeStyle = '#00d8f9'),
      this.context.stroke();
    this.context.beginPath(),
      this.path(land),
      (this.context.strokeWidth = 20),
      this.context.stroke();
    this.context.beginPath(),
      this.path(this.coords),
      (this.context.fillStyle = '#ff7c00'),
      this.context.fill();
    this.context.beginPath(),
      this.path(this.coords),
      (this.context.strokeStyle = 'white'),
      this.context.stroke();
  }

  drag(projection) {
    let v0, q0, r0, a0, l;

    function pointer(event, that) {
      const t = d3.pointers(event, that);

      if (t.length !== l) {
        l = t.length;
        if (l > 1) a0 = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
        dragstarted.apply(that, [event, that]);
      }

      // For multitouch, average positions and compute rotation.
      if (l > 1) {
        const x = d3.mean(t, (p) => p[0]);
        const y = d3.mean(t, (p) => p[1]);
        const a = Math.atan2(t[1][1] - t[0][1], t[1][0] - t[0][0]);
        return [x, y, a];
      }

      return t[0];
    }

    function dragstarted(event) {
      v0 = versor.cartesian(projection.invert(pointer(event, this)));
      q0 = versor((r0 = projection.rotate()));
    }

    function dragged(event) {
      const p = pointer(event, this);
      const v1 = versor.cartesian(projection.rotate(r0).invert(p));
      const delta = versor.delta(v0, v1);
      let q1 = versor.multiply(q0, delta);

      // For multitouch, compose with a rotation around the axis.
      if (p[2]) {
        const d = (p[2] - a0) / 2;
        const s = -Math.sin(d);
        const c = Math.sign(Math.cos(d));
        q1 = versor.multiply([Math.sqrt(1 - s * s), 0, 0, c * s], q1);
      }

      projection.rotate(versor.rotation(q1));

      // In vicinity of the antipode (unstable) of q0, restart.
      if (delta[0] < 0.7) dragstarted.apply(this, [event, this]);
    }

    return d3.drag().on('start', dragstarted).on('drag', dragged);
  }

  getCountry(event) {
    this.pos = this.projection.invert(d3.pointer(event));
    return this.countries.features.find(function (f) {
      return f.geometry.coordinates.find(function (c1) {
        return (
          this.polygonContains(c1, this.pos) ||
          c1.find(function (c2) {
            return this.polygonContains(c2, this.pos);
          })
        );
      });
    });
  }

  polygonContains(polygon, point) {
    this.n = polygon.length;
    this.p = polygon[this.n - 1];
    (this.x = point[0]), (this.y = point[1]);
    (this.x0 = this.p[0]), (this.y0 = this.p[1]);
    this.inside = false;
    for (let i = 0; i < this.n; ++i) {
      (this.p = polygon[i]), (this.x1 = this.p[0]), (this.y1 = this.p[1]);
      if (
        this.y1 > this.y !== this.y0 > this.y &&
        this.x < ((this.x0 - this.x1) * (this.y - this.y1)) / (this.y0 - this.y1) + this.x1
      )
        this.inside = !this.inside;
      (this.x0 = this.x1), (this.y0 = this.y1);
    }
    return this.inside;
  }

  loadData() {
    d3.json('https://unpkg.com/world-atlas@1/world/110m.json').then((data) => {
      this.world = data;
      this.land = topojson.feature(this.world, this.world.objects.land);
      this.countries = topojson.feature(this.world, this.world.objects.countries);
      this.countryList = this.countries;
      window.addEventListener('resize', this.scale);
      this.scale();
    });
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
