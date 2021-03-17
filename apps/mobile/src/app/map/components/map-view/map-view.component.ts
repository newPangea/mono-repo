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

  ngOnInit(): void {
    console.log('map-view-component init')
    d3.csv('../../../../assets/globe-data/nyc-crime-subset.csv').then((data) => {
      
    })

      colorScale  = d3.scale.category10();

      var radiusScale = d3.scale.linear()
          .domain([0, d3.max(crimeData, function(crime) { return +crime.TOT; })])
          .range([1, 10]);

      var geoJSONCrimeFeatures = [];

      crimeData.forEach(function(crime, i) {
          var info = "<span style='color:" + colorScale(crime.CR) + "'><b>" +
                       crime.CR.toLowerCase() + "</b></span><br/>" +
                       "count: <b>" + crime.TOT + "</b>, " +
                       "date: <b>" + crime.MO + "/" + crime.YR + "</b>"

          var geoJSONFeature = {
              "type": "Feature",
              "properties": { // used to style marker below
                  "color":  colorScale(crime.CR),
                  "radius": radiusScale(+crime.TOT),
                  "info":   info
              },
              "geometry": {
                  "type": "Point",
                  "coordinates": [ +crime.longitude, +crime.latitude ] // note long lat!
              }
          };
          geoJSONCrimeFeatures.push(geoJSONFeature);
      });

      makeCrimeMap(geoJSONCrimeFeatures);

  }

  // Load some data and add it to the map!



  var makeCrimeMap = function(geoJSONCrimeFeatures) {
      // L = Leaflet name space, pass it the id of our container
      // Define URL for fetching map tiles, and cite source
      var map       = L.map("map-container"),
          bwOsmURL  = "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          osmAttrs  = "Map data © <a href='http://openstreetmap.org'>OpenStreetMap</a>";

      var osmTiles = new L.TileLayer(bwOsmURL, {
          minZoom: 8,
          maxZoom: 16,
          attribution: osmAttrs
      });

      // Center view on ~NYC
      var nycCoord  = new L.LatLng(40.75, -73.9);

      map.setView(nycCoord, 11); // latlng, zoom level
      map.addLayer(osmTiles);

      L.geoJson(geoJSONCrimeFeatures, {
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
              return L.circleMarker(latlng);
          }

      }).addTo(map);

      // Add legend with d3
      var legendWidth  = 250,
          legendHeight = 150;

      var legend = d3.select('#map-legend').append('svg')
          .attr('width', legendWidth)
          .attr('height', legendHeight);

      var legends = legend.selectAll(".legend")
          .data(colorScale.domain())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      // draw legend colored rectangles
      legends.append("rect")
          .attr("x", legendWidth - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", colorScale);

      // draw legend text
      legends.append("text")
          .attr("x", legendWidth - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d.toLowerCase(); })
  };





}
