let categoryColors = {};
categoryColors['Light Industrial'] = '#275DCA';
categoryColors['Heavy Industrial'] = '#CA2776';
categoryColors['Community Commercial'] = '#FBF41C';
categoryColors['Heavy Commercial'] = '#FB9C1C';
categoryColors['Place of Worship'] = '#1CFBD2';
categoryColors['Office'] = '#1CFB66';

function createGeoJSONForRegion(lowLat,highLat,lowLong,highLong,color) {
    let obj = {
        type: 'FeatureCollection',
        features: [

        ]
    }
}

module.exports.categoryColors = categoryColors;
module.exports.createGeoJSONForRegion = createGeoJSONForRegion;