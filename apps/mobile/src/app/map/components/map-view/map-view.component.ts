/* eslint-disable quotes */
import { OnInit, Component } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import * as d3tile from 'd3-tile';
import { cluster } from 'd3';

@Component({
  selector: 'pang-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
})
export class MapViewComponent implements OnInit {
  ngOnInit() {
    console.log('init');
  }
}
