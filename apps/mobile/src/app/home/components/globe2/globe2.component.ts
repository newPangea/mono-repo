import { Component, OnInit } from '@angular/core';
import * as queue from 'd3-queue';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

@Component({
  selector: 'pang-globe2',
  templateUrl: './globe2.component.html',
  styleUrls: ['./globe2.component.scss'],
})
export class Globe2Component implements OnInit {
  width;
  height;
  config;
  locations;
  svg;
  markerGroup;
  projection;
  initialScale;
  path;
  center;
  gdistance;
  coordinate;
  graticule;
  world: any;
  markers;

  ngOnInit() {
    console.log('init');
    this.width = 960;
    this.height = 500;
    this.config = {
      speed: 0.005,
      verticalTilt: -30,
      horizontalTilt: 0,
    };
    this.locations = [];
    this.svg = d3.select('svg').attr('width', this.width).attr('height', this.height);
    this.markerGroup = this.svg.append('g');
    this.projection = d3.geoOrthographic().precision(0.1);
    this.initialScale = this.projection.scale();
    this.path = d3.geoPath().projection(this.projection);
    this.center = [this.width / 2, this.height / 2];

    this.drawGlobe();
    this.drawGraticule();
    this.enableRotation();

    d3.drag().on('start', this.dragstarted).on('drag', this.dragged).on('end', this.dragended);
  }

  dragstarted() {
    console.log('dragstarted');
  }
  dragged() {
    console.log('dragged');
  }
  dragended() {
    console.log('dragended');
  }

  drawGlobe() {
    d3.json('../../../../assets/globe-data/world-110m.json').then((data) => {
      this.world = data;
      d3.json('../../../../assets/globe-data/locations.json').then((data2) => {
        this.svg
          .selectAll('.segment')
          .data(topojson.feature(this.world, this.world.objects.countries).features)
          .enter()
          .append('path')
          .attr('class', 'segment')
          .attr('d', this.path)
          .style('stroke', 'white')
          .style('stroke-width', '1px')
          .style('fill', (d, i) => '#00b0f0')
          .style('opacity', '1');
        this.locations = data2;
        console.log(this.locations);
        this.drawMarkers();
      });
    });
  }

  drawGraticule() {
    this.graticule = d3.geoGraticule10();

    this.svg
      .append('path')
      .datum(this.graticule)
      .attr('class', 'graticule')
      .attr('d', this.path)
      .style('fill', '#00d8f9');
  }

  enableRotation() {
    d3.timer((elapsed) => {
      this.projection.rotate([this.config.speed * elapsed - 100, this.config.verticalTilt, this.config.horizontalTilt]);
      this.svg.selectAll('path').attr('d', this.path);
      this.drawMarkers();
    });
  }

  drawMarkers() {
    this.markers = this.markerGroup.selectAll('circle').data(this.locations);
    this.markers
      .enter()
      .append('circle')
      .merge(this.markers)
      .attr('cx', (d) => this.projection([d.longitude, d.latitude])[0])
      .attr('cy', (d) => this.projection([d.longitude, d.latitude])[1])
      .attr('fill', (d) => {
        this.coordinate = [d.longitude, d.latitude];
        this.gdistance = d3.geoDistance(this.coordinate, this.projection.invert(this.center));
        return this.gdistance > 1.57 ? 'none' : 'red';
      })
      .attr('r', 7);

    this.markerGroup.each(function () {
      this.parentNode.appendChild(this);
    });
  }
}
