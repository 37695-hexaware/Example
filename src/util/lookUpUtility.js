//Util file to perform some common operation related to data look up
var exceptionCodes = require('./CitiAppExceptionCode');

module.exports.compareSesAndReq = function (ses, req) {
    if(req.companyName) {
        ses.companyName = req.companyName;
    }
    if(req.financialYear) {
        ses.financialYear = req.financialYear;
    }
    if(req.metricsKey) {
        ses.metricsKey = req.metricsKey;
    }
}

module.exports.validateSession = function (ses) {
    if(!ses.companyName) {
        throw exceptionCodes.CODE_002;
    }
    if(!ses.financialYear) {
        throw exceptionCodes.CODE_003;
    }
    if(!ses.metricsKey) {
        throw exceptionCodes.CODE_001;
    }
}
