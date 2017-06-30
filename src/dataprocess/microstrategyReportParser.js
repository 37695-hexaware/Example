var jsonData = require('../../data/MicrostrategyCitiReport.json');

function lookForMetricsIndex(metricsKey) {
  var i=0;
  var totalDataLen = jsonData.result.definition.metrics.length;
  for(; i < totalDataLen; i++) {
      var retrivedMetricsKey = jsonData.result.definition.metrics[i].name;
      if(retrivedMetricsKey == metricsKey) {
        return i;
      }
  }
  return -1;
}

function lookForFinYear(financialYear) {
  //return lookForData(financialYear, jsonData.result.data.root.children, jsonData.result.data.root.children.length)
  var i=0;
  var totalDataLen = jsonData.result.data.root.children.length;
  for(; i < totalDataLen; i++) {
      var retrivedFinancialYear = jsonData.result.data.root.children[i].element.name;
      if(retrivedFinancialYear == financialYear) {
        return i;
      }
  }
  return -1;
}
function InvalidYearException(message) {
   this.message = message;
   this.name = 'InvalidYearException';
}

function processJSON(clientName, financialYear, metricsKey) {
  var financialYearIndex = -1;
  var metricsValue = null;
      financialYearIndex = lookForFinYear(financialYear);

      if(financialYearIndex >= 0) {
          //Logic to look up the metrics data as per client name
          var noOfClients = jsonData.result.data.root.children[financialYearIndex].children.length;
          for(var i=0; i < noOfClients ; i++) {
            var retrivedClientName = jsonData.result.data.root.children[financialYearIndex].children[i].element.name;
            if(retrivedClientName == clientName) {
              try {
                  metricsValue = jsonData.result.data.root.children[financialYearIndex].children[i].metrics[metricsKey].rv;
              } catch(ex) {
                  console.log("No Record found for given data");
                  //console.log(ex);
              }

            }
          }
    }
    else {
      throw new InvalidYearException;
    }
    }
  return metricsValue;
}
//Looking for 2012-12 -- BMY -- finanacial_balance_data.receivables
//var test = processJSON("BMY", "2012-12","finanacial_balance_data.receivables");
//console.log(test);

module.exports.processJSON = processJSON;
