const query = require('./query');

query.queryData('SELECT * FROM raw_crime LIMIT 10;',function(err,results) {
    if(err) console.log(err,err.stack);
    else {
        console.log(JSON.stringify(results));
    }
});