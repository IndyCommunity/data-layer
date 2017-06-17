const AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
const athena = new AWS.Athena();

function queryData(query,callback) {
    const params = {
    QueryString: query, /* required */
    ResultConfiguration: { /* required */
        OutputLocation: 's3://aws-athena-query-results-089961381921-us-east-1/', /* required */
        EncryptionConfiguration: {
        EncryptionOption: 'SSE_S3' /* required */
        }
    },
    QueryExecutionContext: {
        Database: 'indydata'
    }
    };

    athena.startQueryExecution(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else     console.log(data);
            const pollDB = setInterval(function() {
            athena.getQueryResults({QueryExecutionId: data.QueryExecutionId}, function(err1, results) {
                if (err1) {
                    if( err1.code != 'InvalidRequestException') {
                        console.log(err1, err1.stack);
                    }
                }
                else {
                    callback(err1,results.ResultSet.Rows);
                    clearInterval(pollDB);
                }
            });
        },1000)
    });
}

module.exports.queryData = queryData;