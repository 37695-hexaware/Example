var microstrategyParser = require('../../dataprocess/microstrategyReportParser');
var dataLookUpPOJO = require('../../util/plainobj/DataLookUpPOJO');
var lookUpUtil = require('../../util/lookUpUtility');
var sessionHandler = require('../sessionHandler');
var exceptionCodes = require('../../util/CitiAppExceptionCode');

function processMessage(req, res) {
  var sessionId = req.body.sessionId;
  var dataLookUPSesObj = sessionHandler.getDataLookUpSessionObj(sessionId);
  var actionName = req.body.result.action;
  if(actionName == "input.lookup_citidata") {
      var financialYear = "";
      var companyName = "";
      var totalContexts = req.body.result.contexts.length;
      for(var i=0; i < totalContexts; i++) {
          followUpIndentName = req.body.result.contexts[i].name;
          if(followUpIndentName == "lookup_citidata-followup") {
              companyName = req.body.result.contexts[i].parameters.company_name;
              financialYear = req.body.result.contexts[i].parameters.year;
              metricsKey = req.body.result.contexts[i].parameters.finanacial_balance_data;
              break;
          }
      }
      console.log("Looking for "+financialYear+" -- "+companyName+" -- "+metricsKey);

      var tempLookupPojo = new dataLookUpPOJO.CitiMicroStrategyParams();
      tempLookupPojo.companyName = companyName;
      tempLookupPojo.financialYear = financialYear;
      tempLookupPojo.metricsKey = metricsKey;
      lookUpUtil.compareSesAndReq(dataLookUPSesObj, tempLookupPojo);
      var resagent = null;
      try {
          lookUpUtil.validateSession(dataLookUPSesObj);
          resagent = microstrategyParser.processJSON(dataLookUPSesObj.companyName,
              dataLookUPSesObj.financialYear, dataLookUPSesObj.metricsKey);

              if(!resagent) {
                  resagent = "OOPS.., Sorry, I guess I have missed something, Are these input correct?"
                  +" Customer Name: "+dataLookUPSesObj.companyName+" financial year: "+dataLookUPSesObj.financialYear
                  +" requested metrics data "+dataLookUPSesObj.metricsKey;
              } else {
                  resagent = dataLookUPSesObj.metricsKey+" value of client "
                    +dataLookUPSesObj.companyName+" for financial year "
                    +dataLookUPSesObj.financialYear+" is "+resagent;
              }

      } catch(ex) {
          console.log("Not all data provided for data look up");
          if(ex == exceptionCodes.CODE_001) {
              resagent = "Please mention the metrics info that you need"
          } else if(ex == exceptionCodes.CODE_002) {
              resagent = "For which customer you need the metrics information?"
          } else if(ex == exceptionCodes.CODE_003) {
              resagent = "Please specify the financial year"
          }
          resagent = " please enter valid month";
          console.log(e.message,e.name);
      }

      return res.json({
        speech:resagent,
        displayText: resagent,
        source:'slack'
      });
  }
  return res;
}

  module.exports.processMessage = processMessage;
