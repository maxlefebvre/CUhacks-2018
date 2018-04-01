/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple languages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa   = require('alexa-sdk');
const request = require('request');
const oc      = require('oc-transpo');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = "amzn1.ask.skill.14e8ce28-74ca-4d85-b50b-8f7ba073164d";


const GET_ADDRESS = "Here's your address: ";
const HELP_MESSAGE = 'You can say tell me a space fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

oc.setup({
  key: "36422cd052fedbe8266b888b26365a19",
  appID: "560500cd"
});


//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

exports.handler = function(event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.appId = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

const handlers = {
  'LaunchRequest': function() {
    //this.emit('TellQuizIntent');
    this.emit('LaunchIntent');
  },
  'LaunchIntent': function() {
    this.emit(':ask', "Welcome to the OC Transpo Bus Schedules, what is your bus and stop number?");
  },
  
  'BusScheduleIntent': function(){
    var busID = this.event.request.intent.slots.busID.value;
    var stopID = this.event.request.intent.slots.stopID.value;
    var arrivalTime = -1;
    // Get time until next bus
    getRouteInfo(stopID, busID, function(data){
      if(data && data.routes[0] && data.routes[0].trips) {
        // Get top result's trips
        let nextTrip = data.routes[0].trips[0];
        arrivalTime = nextTrip.arrivalTime;
      }
    });
    if (arrivalTime != -1) this.emit(':tell', "Bus number "+ busID +" will arrive in  "+ arrivalTime);
    else this.emit(':tell', 'There are no trips available.')
  },
  //bus number is "+ busID +" and your 
  'AMAZON.HelpIntent': function() {
    var speechOutput = HELP_MESSAGE;
    var reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
};

// OC transpo helper functions
function getStopSummary(stopid, callback) {
  oc.getStopSummary(stopid, function (error, data) {
      console.log('Get stop summary');
      if (error) {
          console.error(error);
          return null;
      }
      return callback(data);
  });
}

function getRouteInfo(stopid, busid, callback) {
  oc.getRouteInformation(3000, 44, function (error, data) {
      console.log('Get route info');
      if (error) {
          console.error(error);
          return null;
      }
      console.log('Next bus is in: ' + data.routes[0].trips[0].arrivalTime + ' mins');
      return callback(data);
  });
}
function getStopInfo(stopid, callback) {
  oc.getStopInformation(stopid, function (error, data) {
      console.log('Get stop info');
      if (error) {
          console.error(error);
          return null;
      }
      return callback(data);
  });
}