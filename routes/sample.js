var express = require('express');
const fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("Retrieving Samples");
  let dataJson;

    fs.readFile('./sampledata.json', (error, data) => {
      console.log('Async Read: starting...');

      if (error) {
        // if there is an error, print it
        console.log('Async Read : NOT successful!');
        console.log(error);
      } else {
        try {
          // try to parse the JSON data
          dataJson = JSON.parse(data);
          console.log('Async Read: successful!');
          console.log(dataJson);
          res.send(dataJson);
        } catch (error) {
          // else print an error (e.g. JSON was invalid)
          console.log(error);
          res.send("error");
        }
      }
    });
});

router.get('/idNumeric:idNumeric', function(req, res, next) {
    console.log("Searching for sample");
    console.log(req.url);
        fs.readFile('./sampledata.json', (error, data) => {
    console.log('Async Read Sample: starting...');

    if (error) {
        // if there is an error, print it
        console.log('Async Read : NOT successful!');
        console.log(error);
      } else {
        try {
          // try to parse the JSON data
          dataJson = JSON.parse(data);
          idNumeric = req.url.split("idNumeric");
          samples = dataJson['samples']

          let sampleInfo;
          samples.forEach(sample => {
              if (sample['idNumeric'] == idNumeric[1]) {
                  sampleInfo = sample;
              }
          });
          console.log(sampleInfo);
          res.send(sampleInfo);
        } catch (error) {
          // else print an error (e.g. JSON was invalid)
          console.log(error);
          res.send("error");
        }
      }
    });

})

module.exports = router;

