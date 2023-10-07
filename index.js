const url="https://firms.modaps.eosdis.nasa.gov/api/area/csv/efc81a030842f1f2809a40ade2162752/VIIRS_SNPP_NRT/world/1";
const https = require('https');
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
    console.log(data);

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