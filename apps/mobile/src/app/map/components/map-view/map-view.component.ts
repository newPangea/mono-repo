import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'pang-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapViewComponent implements OnInit {


  colorScale; // accessible in d3.csv() and makeCrimeMap()
  radiusScale;
  geoJSONCrimeFeatures = [];
  crimeData: any;
  info
  geoJSONFeature
  L
  map
  bwOsmURL
  osmAttrs
  osmTiles
  nycCoord
  legendWidth
  legendHeight
  legend
  legends

  ngOnInit(): void {
    console.log('map-view-component init')
    d3.csv('../../../../assets/globe-data/nyc-crime-subset.csv').then((data) => {
        this.colorScale  = d3.scaleOrdinal(d3.schemeCategory10);
        this.crimeData = data;

        this.radiusScale = d3.scaleLinear()
            .domain([0, d3.max(this.crimeData, function(crime) { return +this.crime.TOT; })])
            .range([1, 10]);
        })
        this.crimeData.forEach((crime) => {
            this.info = '<span style=\'color:' + this.colorScale(crime.CR) + '\'><b>' +
                         crime.CR.toLowerCase() + '</b></span><br/>' +
                         'count: <b>' + crime.TOT + '</b>, ' +
                         'date: <b>' + crime.MO + '/' + crime.YR + '</b>'
  
            this.geoJSONFeature = {
                type: 'Feature',
                properties: { // used to style marker below
                    color:  this.colorScale(crime.CR),
                    radius: this.radiusScale(+crime.TOT),
                    info:   this.info
                },
                geometry: {
                    type: 'Point',
                    coordinates: [ +crime.longitude, +crime.latitude ] // note long lat!
                }
            };
            this.geoJSONCrimeFeatures.push(this.geoJSONFeature);
        });

        



      this.makeCrimeMap(this.geoJSONCrimeFeatures);

  }


  makeCrimeMap(geoJSONCrimeFeatures){
      // L = Leaflet name space, pass it the id of our container
      // Define URL for fetching map tiles, and cite source
      this.map = this.L.map('map-container'),
          this.bwOsmURL  = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          this.osmAttrs  = 'Map data © <a href=\'http://openstreetmap.org\'>OpenStreetMap</a>';

      this.osmTiles = new this.L.TileLayer(this.bwOsmURL, {
          minZoom: 8,
          maxZoom: 16,
          attribution: this.osmAttrs
      });

      // Center view on ~NYC
      this.nycCoord  = new this.L.LatLng(40.75, -73.9);

      this.map.setView(this.nycCoord, 11); // latlng, zoom level
      this.map.addLayer(this.osmTiles);

      this.L.geoJson(geoJSONCrimeFeatures, {
          style: function (feature) {
              return {
                  color:       '#000',
                  opacity:     0,
                  radius:      feature.properties.radius,
                  fillColor:   feature.properties.color,
                  fillOpacity: 0.7
              };
          },
          onEachFeature: function (feature, layer) {
              layer.bindPopup(feature.properties.info);
          },
          pointToLayer: function (feature, latlng) {
              return this.L.circleMarker(latlng);
          }

      }).addTo(this.map);

      // Add legend with d3
      this.legendWidth  = 250,
          this.legendHeight = 150;

      this.legends = d3.select('#map-legend').append('svg')
          .attr('width', this.legendWidth)
          .attr('height', this.legendHeight);

      this.legends = this.legend.selectAll('.legend')
          .data(this.colorScale.domain())
        .enter().append('g')
          .attr('class', 'legend')
          .attr('transform', function(d, i) { return 'translate(0,' + i * 20 + ')'; });

      // draw legend colored rectangles
      this.legends.append('rect')
          .attr('x', this.legendWidth - 18)
          .attr('width', 18)
          .attr('height', 18)
          .style('fill', this.colorScale);

      // draw legend text
      this.legends.append('text')
          .attr('x', this.legendWidth - 24)
          .attr('y', 9)
          .attr('dy', '.35em')
          .style('text-anchor', 'end')
          .text(function(d) { return d.toLowerCase(); })
  }

}
