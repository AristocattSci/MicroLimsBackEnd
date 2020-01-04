var express = require('express');
var router = express.Router();
const fs = require('fs');



router.get(/.*/, function(req, res, next) {
  console.log("I have made the request niiiiice");
  console.log(req.url);
  //given the url pull DB information
  let tableData = getData(req.url);
  console.log(tableData);
  let myobj = tableData['data'][0];
  tableData['columns'] = Object.keys(myobj)
  res.send(tableData);
  
});

function getData(url){
    let path = url.substr(1).split('/');

     console.log("Retrieving Samples");
    let dataJson;

    let fileContents = fs.readFileSync('./data/'+ path + '.json', 'utf8'); 
    dataJson = JSON.parse(fileContents);
    console.log(fileContents);
    return dataJson;
}


module.exports = router;