const analysis = require('./analysis');

analysis.getCoordinatesForCrimes(function(err,results) {
    console.log(JSON.stringify(results));
});