

  const dataLookUpSessionMap = new Map();

  const dataLookUpPOJOs = require('../util/plainobj/DataLookUpPOJO');

  //Function to look up the preserved parameters that needed for looking up metrics data of
  //citi micro strategy. These lookup will be done based on sessions
  function getDataLookUpSessionObj(sessionId) {
      var pojoObj = dataLookUpSessionMap.get(sessionId);
      console.log("I am holding values for "+dataLookUpSessionMap.size+" sessions");
      if(pojoObj == null) {
        pojoObj = new dataLookUpPOJOs.CitiMicroStrategyParams();
        dataLookUpSessionMap.set(sessionId, pojoObj);
      }
      return pojoObj;
  }

  module.exports.getDataLookUpSessionObj = getDataLookUpSessionObj;
