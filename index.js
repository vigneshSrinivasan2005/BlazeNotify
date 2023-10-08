
const fs = require('fs');
userLocation=[{x:445018.788777979614679, y:371612.68037816172}]
const geojsonString = fs.readFileSync('file.csv', 'utf-8');
latlong=parseData(geojsonString);
xyPoints= projectionToWSGS(latlong);
const turf = require('@turf/turf');

temp = processXY(xyPoints,userLocation[0]);
left=temp.one;
right=temp.two;
near=temp.three;

dataToMP3(left,right,near);

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
function dataToMP3(left,right,near){
  txt ="FIRE HAZARDS:\n"+ 
        "From left, true bearing "+left.bearing.toFixed(2)+" degrees, range "+ left.distance.toFixed(2)+"kilometers\n " +
        "From right, true bearing "+right.bearing.toFixed(2)+" degrees, range "+ right.distance.toFixed(2)+"kilometers\n " +
        "Closest at true bearing"+near.bearing.toFixed(2)+" degrees, range "+ near.distance.toFixed(2)+"kilometers\n";
  const say = require('say')
  var fs = require('fs')
  console.log("here");
  
  say.export(txt,'Samantha', 1, "output.wav", (err) => {
    if (err) {
      return console.error(err)
    }
  
    console.log('Text has been saved to hal.wav.')
  });
}

function projectionToWSGS(latLong){
  proj4=require("proj4")
  firstProjection='PROJCS["NAD83 / Washington South (ftUS)",GEOGCS["NAD83",DATUM["North_American_Datum_1983",SPHEROID["GRS 1980",6378137,298.257222101,AUTHORITY["EPSG","7019"]],AUTHORITY["EPSG","6269"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4269"]],UNIT["US survey foot",0.3048006096012192,AUTHORITY["EPSG","9003"]],PROJECTION["Lambert_Conformal_Conic_2SP"],PARAMETER["standard_parallel_1",47.33333333333334],PARAMETER["standard_parallel_2",45.83333333333334],PARAMETER["latitude_of_origin",45.33333333333334],PARAMETER["central_meridian",-120.5],PARAMETER["false_easting",1640416.667],PARAMETER["false_northing",0],AUTHORITY["EPSG","2286"],AXIS["X",EAST],AXIS["Y",NORTH]]';
  pointArray=[]
  latLong.forEach(element => {
      i=proj4(firstProjection,[element.longitude, element.latitude])
      pointArray.push({x:i[0],y:i[1]})
  });
  return pointArray;
}

// [pointdistMin, pointBearing], [bearingMin, bearingPoint], [bearingMax, beairngPoint]
function processXY(xyPoints, userLocation){
  points = [];
  tempUser = turf.point([userLocation.x, userLocation.y]);
  pointMinDist = {distance:100000000,bearing:0};
  pointMinBearing = {distance:0,bearing:370}
  pointMaxBearing = {distance:0,bearing:-1};
  
  xyPoints.forEach(i => {
    var destination = turf.point([i.x, i.y]);

    points[i] = {
      distance: turf.distance(tempUser, destination, {units: 'kilometers'}),
      bearing: turf.bearing(tempUser, destination)
    };
    
    if(points[i].distance < pointMinDist.distance){
      pointMinDist = points[i];
    }

    if(points[i].bearing < pointMinBearing.bearing){
      pointMinBearing = points[i];
    }

    if(points[i].bearing > pointMaxBearing.bearing){
      pointMaxBearing = points[i];
    }
  });

  return {one:pointMinDist, two:pointMinBearing, three:pointMaxBearing};
}















//unused functions due to time constraints.
///
///
///
///
///

function getRTData(){
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
      return data;
      //console.log(data.JSON);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
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
