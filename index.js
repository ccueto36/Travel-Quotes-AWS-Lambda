/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = 'YOUR_APP_ID';

const SKILL_NAME = 'Travel Quotes';
const GET_QUOTE_MESSAGE = "Here's your quote: ";
const WELCOME_MESSAGE = "Welcome to Travel Quotes. You can say tell me a travel quote, or you can say exit...What can I help you with?";
const HELP_MESSAGE = 'You can say tell me a travel quote, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
    'Travel makes one modest, you see what a tiny place you occupy in the world.',
    'Travel is fatal to prejudice, bigotry, and narrow-mindedness.',
    'One\'s destination is never a place, but always a new way of seeing things.',
    'People travel to faraway places to watch, in fascination, the people they ignore at home.',
    'Not until we are lost do we begin to understand ourselves.',
    'Once you have travelled, the voyage never ends, but is played out over and over again in the quietest chambers. The mind can never break off from the journey.',
    'Don\'t tell me how educated you are, tell me how much you travelled.',
    'Twenty years from now you will be more disappointed by the things you didn\'t do than by the ones you did. So throw off the bowlines, sail away from the safe harbor. Catch the trade winds in you sail. Explore. Dream. Discover.',
    'Travel and change of place impart new vigour to the mind.',
    'The world is a book, and those who do not travel read only a page.',
    'A good traveler has no fixed plans, and is not intent on arriving.',
    'I see my path, but I don\'t know where it leads. Not knowing where I\'m going is what inspires me to travel it.',
    'A journey is a person in itself; no two are alike. And all plans, safeguards, policing, and coercion are fruitless. We find that after years of struggle that we do not take a trip; a trip takes us.' 
];

//=========================================================================================================================================
//Editing anything below this line might break your skill.
//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        const speechOutput = WELCOME_MESSAGE;
        const reprompt = HELP_REPROMPT;
        
        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'Unhandled': function() {
        this.emit(':ask', 'Error while trying to run skill');
        },
    'GetNewTravelQuoteIntent': function () {
        const quoteArr = data;
        const quoteIndex = Math.floor(Math.random() * quoteArr.length);
        const randomQuote = quoteArr[quoteIndex];
        const speechOutput = GET_QUOTE_MESSAGE + randomQuote;

        this.response.cardRenderer(SKILL_NAME, randomQuote);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
