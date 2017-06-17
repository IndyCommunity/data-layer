const analysis = require('./analysis');
/*
query.queryData('SELECT * FROM raw_land_use LIMIT 10;',function(err,results) {
    if(err) console.log(err,err.stack);
    else {
        console.log(JSON.stringify(results));
    }
});
(?)
*/

analysis.getCoordinatesForZone('Light Industrial',function(err,results) {
    console.log(JSON.stringify(results));
    
});