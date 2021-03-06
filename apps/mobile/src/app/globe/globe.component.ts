import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from 'topojson'
import { Topology, Objects } from 'topojson-specification';

@Component({
  selector: 'pang-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.css']
})
export class GlobeComponent implements OnInit {

  context;
  svg;
  margin = 50;
  width = 750 - (this.margin * 2);
  height = 400 - (this.margin * 2);

  ngOnInit(): void {
    console.log('starting init')
    //initialize
    this.createSvg();
  }


  private createSvg(): void {
    this.svg = d3.select('figure#globe')
    .append('svg')
    .attr('width', this.width + (this.margin * 2))
    .attr('height', this.height + (this.margin * 2))
    .append('g')
    .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
}

}
