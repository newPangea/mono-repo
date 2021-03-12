import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import * as versor from 'versor';

@Component({
  selector: 'pang-globe3',
  templateUrl: './globe3.component.html',
  styleUrls: ['./globe3.component.scss'],
})
export class Globe3Component implements OnInit {
  ngOnInit() {
    console.log('init 3');
  }
}
