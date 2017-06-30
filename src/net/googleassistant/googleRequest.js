var microstrategyParser = require('../../dataprocess/microstrategyReportParser');
var dataLookUpPOJO = require('../../util/plainobj/DataLookUpPOJO');
  var sessionHandler = require('../sessionHandler');


const ApiAiApp = require('actions-on-google').ApiAiApp;

function simpleResponse (req, res) {
  console.log('inside simpleResponse');
  const appapi = new ApiAiApp({request: req, response: res});
  const WELCOME_INTENT = 'input.welcome';
  const LOOKUP_INTENT = 'input.lookup_citidata';
  //var sessionId=req.body.sessionId;



  const actionMap = new Map();
  actionMap.set(WELCOME_INTENT, welcomeIntent);
  actionMap.set(LOOKUP_INTENT, lookupdataIntent);
  //appapi.setArgument('sessionId', sessionId);
  appapi.handleRequest(actionMap);


};

function welcomeIntent (appapi) {
  console.log('inside welcomeIntent');

  appapi.ask('Welcome to cityassistant..how can i help you...');
}

function lookupdataIntent (appapi) {
console.log('inside look up intent');
var sessionId=appapi.getUser().userId;
    console.log('session id is:'+sessionId);
//console.log('session id in look up is:'+sessionId);

var sessionObj=sessionHandler.getDataLookUpSessionObj(sessionId);

console.log("session id is "+sessionId+" and resp value is "+sessionObj.companyName+" "+
          sessionObj.financialYear+" "+sessionObj.metricsKey);



if(appapi.getArgument('company_name')!=null){
sessionObj.companyName=appapi.getArgument('company_name');
}
if(appapi.getArgument('year')!=null){
sessionObj.financialYear=appapi.getArgument('year');
}
if(appapi.getArgument('finanacial_balance_data')!=null){
sessionObj.metricsKey=appapi.getArgument('finanacial_balance_data');
}

console.log("session id is "+sessionId+" and resp value after getting argument is "+sessionObj.companyName+" "+
          sessionObj.financialYear+" "+sessionObj.metricsKey);

if(sessionObj.companyName==null){
  appapi.tell('Pls provide the company name');
}
if(sessionObj.financialYear==null){
  appapi.tell('Pls provide the year for which u need the data');
}
if(sessionObj.metricsKey==null){
  appapi.tell('What type of data would u like to obtain');
}


var jsonParser = require('../../dataprocess/microstrategyReportParser');
//let contexts = appapi.getContexts();
//console.log('CONTEXTS are'+contexts)
//const finData='financial balance sheet.';
/*  const compName = appapi.getArgument('company_name');
  const year=appapi.getArgument('year');

  const financialdata=appapi.getArgument('finanacial_balance_data');*/

  const compName = sessionObj.companyName;
   const year=sessionObj.financialYear;

   const financialdata=sessionObj.metricsKey;
  //const financedataforParse=finData+financialdata;
  console.log('company name is'+compName);
  console.log('year is'+year);
    console.log('financedataforParse is'+financialdata);
    var result=jsonParser.processJSON(compName,year,financialdata);
    console.log('result is'+result);

if(result==null){
  appapi.tell(' Sorry we dont have the data for what you have asked..You asked for company name  ' +
  compName + ' for year '+year + ' for '+ financialdata );
}
else{
/*  appapi.tell(' We have got the data you asked for.You asked for company name  ' +
  compName + ' for year '+year + ' for '+ financialdata +'. It is '+result);*/

  appapi.ask(appapi.buildRichResponse()
      .addSimpleResponse({speech: '  It is '+result ,
        displayText: ' It is '+result})
        .addBasicCard(appapi.buildBasicCard(' We have got the data you asked for.You asked for company name  ' +
        compName + ' for year '+year + ' for '+ financialdata +'. It is '+result+'  . Do u need anything else?')
             .setTitle('Citi assistant data you asked for:')
             .addButton('Read more')
             .setImage('https://careerarc-com.s3.amazonaws.com/companies/142/logos/primary_190_thumb_med.jpg?1472507336', 'Image alternate text')
)

    /*  .addSuggestions(
        ['yes', 'no'])*/

    );



}
}



var exports = module.exports = {
  simpleResponse: simpleResponse
};
