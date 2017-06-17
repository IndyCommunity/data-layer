const query = require('./query');

function getCrimeAmountWithinRange(lowLat,highLat,lowLong,highLong,callback) {
    
}

function getCrimeAmountWithinRangeWithinYear(lowLat,highLat,lowLong,highLong,callback) {

}

function getTotalCrimeAmountByYear(year,callback) {

}

function getCrimeChartData() {
    return([53917,53017,52713,55757]);
}

function getCoordinatesForZone(zone,callback) {
    query.queryData(`
        SELECT address_cords.address, address_cords.latitude, address_cords.longitude, raw_land_use.use14_label
        FROM raw_land_use 
        INNER JOIN address_cords
        ON address_cords.address = CONCAT(CAST(raw_land_use.stnumber AS VARCHAR), ' ', raw_land_use.full_stname)
        AND raw_land_use.use14_label = '${zone}';
    `,function(err,results) {
        let coordinateData = [];
        results.shift();
        results.forEach(function(result) {
            let coordinate = {
                lat: result.Data[1].VarCharValue,
                long: result.Data[2].VarCharValue,
            }
            coordinateData.push(coordinate);
        })
        callback(err,coordinateData);
    });
}

function getCoordinatesForCrimes(callback) {
    query.queryData(`
        SELECT address_cords.address, address_cords.latitude, address_cords.longitude, raw_crime.crime
        FROM raw_crime 
        INNER JOIN address_cords
        ON address_cords.address = raw_crime.address
    `,function(err,results) {
        let coordinateData = [];
        results.shift();
        results.forEach(function(result) {
            let coordinate = {
                lat: result.Data[1].VarCharValue,
                long: result.Data[2].VarCharValue,
            }
            coordinateData.push(coordinate);
        })
        callback(err,coordinateData);
    });
}

function getCrimeLatLongWithinRange(lowLat,highLat,lowLong,highLong,callback) {
    
}

function getCrimeLatLongWithinRangeWithinYear(lowLat,highLat,lowLong,highLon,callback) {

}

module.exports.getCrimeAmountWithinRange = getCrimeAmountWithinRange;
module.exports.getCrimeAmountWithinRangeWithinYear = getCrimeAmountWithinRangeWithinYear;
module.exports.getTotalCrimeAmountByYear = getTotalCrimeAmountByYear;
module.exports.getCrimeChartData = getCrimeChartData;
module.exports.getCrimeLatLongWithinRange = getCrimeLatLongWithinRange;
module.exports.getCrimeLatLongWithinRangeWithinYear = getCrimeAmountWithinRangeWithinYear;
module.exports.getCoordinatesForZone = getCoordinatesForZone;
module.exports.getCoordinatesForCrimes = getCoordinatesForCrimes;