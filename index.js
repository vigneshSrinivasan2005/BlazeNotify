const url="https://firms.modaps.eosdis.nasa.gov/api/area/csv/efc81a030842f1f2809a40ade2162752/VIIRS_SNPP_NRT/world/1";
const https = require('https');
var AWS = require('aws-sdk');
var data2={};
https.get(url, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
    //console.log(chunk);
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(typeof(data));
    start(data);
    //console.log(data.JSON);

  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

function start(data){
  sendVoiceMailTwilo();
  /*coordinateArr = parseData(data)
  coordinateArr.forEach(i => {
    console.log("Latitude: " + i.latitude + ", Longitude: " + i.longitude);
  })*/
}

// Parsing the fire data and storing the latitude and longitude coordinates
function parseData(data){
  coordinates = [];
  nums = 0;
    
  // Split the data by line
  rows = data.split("\n");
  rows.shift();

  rows.forEach(i => {
  
    if(nums<10) {
  
      // Splitting each line and inputting an object with a [latitude, longtitude]
      coordinates[nums] = {
        latitude: parseFloat(i.split(",")[0]),
        longitude: parseFloat(i.split(",")[1])             
      };
    }

    nums++;
  })

  return coordinates;
}

//give data in following way
//List {{distance, direction},....}
//direction is a string(24 degrees north)
function dataToText(list1){
    txt ="";
    list.array.forEach(element => {
        txt+="Hey, watch out there is a possible wildfire "+ element.distance+ " miles and "+
        element.direction+" of you!\n"
    });
    return txt;
}
function sendVoiceMailTwilo(){
  // Download the helper library from https://www.twilio.com/docs/node/install
  // Find your Account SID and Auth Token at twilio.com/console
  // and set the environment variables. See http://twil.io/secure
  const accountSid = "ACbb7ff44ec3124e6f3af7112e6f749d42"
  const authToken = "829bcc1f291944ab13caa8797465c372"
  const client = require('twilio')(accountSid, authToken);
  client.calls
        .create({
          url: 'http://demo.twilio.com/docs/voice.xml',
          to: '+14253809815',
          from: '+18445340377'
        })
        .then(call => console.log(call.sid));
}
function sendVoiceMailAWS(){
// The AWS Region that you want to use to send the voice message. For a list of
// AWS Regions where the Amazon Pinpoint SMS and Voice API is available, see
// https://docs.aws.amazon.com/pinpoint-sms-voice/latest/APIReference/
var aws_region = "us-east-1";

// The phone number that the message is sent from. The phone number that you
// specify has to be associated with your Amazon Pinpoint account. For best results, you
// should specify the phone number in E.164 format.
var originationNumber = "+12562748329";

// The recipient's phone number. For best results, you should specify the phone
// number in E.164 format.
var destinationNumber = "+14256154805";

// The language to use when sending the message. For a list of supported
// languages, see https://docs.aws.amazon.com/polly/latest/dg/SupportedLanguage.html
var languageCode = "en-US";

// The Amazon Polly voice that you want to use to send the message. For a list
// of voices, see https://docs.aws.amazon.com/polly/latest/dg/voicelist.html
var voiceId = "Matthew";

// The content of the message. This example uses SSML to customize and control
// certain aspects of the message, such as the volume or the speech rate.
// The message can't contain any line breaks.
var ssmlMessage = "<speak>"
    + "This is a test message sent from <emphasis>Amazon Pinpoint</emphasis> "
    + "using the <break strength='weak'/>AWS SDK for JavaScript in Node.js. "
    + "<amazon:effect phonation='soft'>Thank you for listening."
    + "</amazon:effect>"
    + "</speak>";

// The phone number that you want to appear on the recipient's device. The phone
// number that you specify has to be associated with your Amazon Pinpoint account.

// The configuration set that 
// Specify that you're using a shared credentials file, and optionally specify
// the profile that you want to use.
var credentials = new AWS.SharedIniFileCredentials({profile: 'default'});
AWS.config.credentials = credentials;

// Specify the region.
AWS.config.update({region:aws_region});

//Create a new Pinpoint object.
var pinpointsmsvoice = new AWS.PinpointSMSVoice();

var params = {
  
  Content: {
    SSMLMessage: {
      LanguageCode: languageCode,
      Text: ssmlMessage,
      VoiceId: voiceId
    }
  },
  OriginationPhoneNumber: originationNumber,
  DestinationPhoneNumber: destinationNumber,  
  
  
};

//Try to send the message.
pinpointsmsvoice.sendVoiceMessage(params, function(err, data) {
  // If something goes wrong, print an error message.
  if(err) {
    console.log(err.message);
  // Otherwise, show the unique ID for the message.
  } else {
    console.log("Message sent! Message ID: " + data['MessageId']);
  }
});
}
