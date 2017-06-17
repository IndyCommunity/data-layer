const query = require('./query');

var categoryColors = {};
categoryColors['Light Industrial'] = '#275DCA';
categoryColors['Heavy Industrial'] = '#CA2776';
categoryColors['Community Commercial'] = '#FBF41C';
categoryColors['Heavy Commercial'] = '#FB9C1C';
categoryColors['Place of Worship'] = '#1CFBD2';
categoryColors['Office'] = '#1CFB66';

const mapData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        stroke: '#025500',
        'stroke-width': 2,
        'stroke-opacity': 1,
        fill: '#005506',
        'fill-opacity': 0.5
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              -86.32164001464844,
              39.796930657340724
            ],
            [
              -86.165771484375,
              39.796930657340724
            ],
            [
              -86.165771484375,
              39.915529641706314
            ],
            [
              -86.32164001464844,
              39.915529641706314
            ],
            [
              -86.32164001464844,
              39.796930657340724
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              -86.1609649658203,
              39.79745821729238
            ],
            [
              -86.02020263671875,
              39.79745821729238
            ],
            [
              -86.02020263671875,
              39.91605629078665
            ],
            [
              -86.1609649658203,
              39.91605629078665
            ],
            [
              -86.1609649658203,
              39.79745821729238
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              -86.32095336914062,
              39.68076911511416
            ],
            [
              -86.16645812988281,
              39.68076911511416
            ],
            [
              -86.16645812988281,
              39.79323762437003
            ],
            [
              -86.32095336914062,
              39.79323762437003
            ],
            [
              -86.32095336914062,
              39.68076911511416
            ]
          ]
        ]
      }
    },
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [
              -86.16371154785156,
              39.680240661158805
            ],
            [
              -86.01951599121094,
              39.680240661158805
            ],
            [
              -86.01951599121094,
              39.7958755252971
            ],
            [
              -86.16371154785156,
              39.7958755252971
            ],
            [
              -86.16371154785156,
              39.680240661158805
            ]
          ]
        ]
      }
    }
  ]
}

//console.log(mapData.features.length);
/*
findBestZoneForRegion('Community Commercial',function(scores,min,minIndex){
    console.log("scores");
    console.log(scores);
    console.log("min",min);
    console.log(getGeoJSONForRegionIndex(minIndex));
});
*/

/*
scoreZoneInRegion('Community Commercial',mapData.features[2].geometry.coordinates,0,function(err,index,results) {
    console.log(results);
})
*/

function scoreZoneInRegion(zone,coordinates,index,callback) {
    const lowerLat = coordinates[0][0][1];
    const upperLat = coordinates[0][2][1];
    const lowerLong = coordinates[0][0][0];
    const upperLong = coordinates[0][1][0];
    query.queryData(`
        SELECT COUNT(DISTINCT address_cords.address)
        FROM raw_land_use 
        INNER JOIN address_cords
        ON address_cords.address = CONCAT(CAST(raw_land_use.stnumber AS VARCHAR), ' ', raw_land_use.full_stname)
        AND address_cords.latitude > ${lowerLat} AND address_cords.latitude < ${upperLat} AND ABS(address_cords.longitude) > 86.165771484375  AND ABS(address_cords.longitude) < 86.32164001464844
        AND raw_land_use.use14_label = '${zone}'
        INNER JOIN raw_crime
        ON address_cords.address = raw_crime.address
    `,function(err,results) {
        const scoreStr = results[1].Data[0].VarCharValue;
        const score = parseInt(scoreStr);
        callback(err,index,score);
    });
}

function findBestZoneForRegion(zone,callback) {
    const scores = {};
    var scoreCount = 0;
    var min = 1000000;
    var minIndex = 0;
    for(var i = 0; i < 4; i++) {
        scoreZoneInRegion('Community Commercial',mapData.features[i].geometry.coordinates,i,function(err,index,results) {
            console.log(index,results);
            if(results < min) {
                min = results;
                minIndex = index;
            }
            scores[`${index}`] = results;
            scoreCount++;
        });
    }
    const scoreCheck = setInterval(function(){
        if(scoreCount === 4) {
            clearInterval(scoreCheck);
            callback(scores,min,minIndex);
        }
    },1000);
}

function getGeoJSONForRegionIndex(index,zone) {
    var data = {
        type: 'FeatureCollection',
        features: [
            {
            type: 'Feature',
            properties: {
                stroke: '#025500',
                'stroke-width': 2,
                'stroke-opacity': 1,
                fill: '#005506',
                'fill-opacity': 0.5
            },
            geometry: {
                type: 'Polygon',
                coordinates: []
            }
            }
        ]
    };
    data.features[0].geometry.coordinates = mapData.features[index].geometry.coordinates;
    data.features[0].properties.stroke = categoryColors[zone];
    data.features[0].properties.fill = categoryColors[zone];
    return JSON.stringify(data);
}

module.exports.getGeoJSONForRegionIndex = getGeoJSONForRegionIndex;
module.exports.findBestZoneForRegion = findBestZoneForRegion;
module.exports.scoreZoneInRegion = scoreZoneInRegion;