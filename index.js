const url="https://firms.modaps.eosdis.nasa.gov/api/area/csv/efc81a030842f1f2809a40ade2162752/LANDSAT_NRT/world/1";
const https = require('https');
var data2={};
https.get(url, (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
    data2=data;
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
data2.array.forEach(element => {
    console.log(element);
});