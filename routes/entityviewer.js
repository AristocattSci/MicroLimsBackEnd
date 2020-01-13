var express = require('express');
var router = express.Router();
const fs = require('fs');
var db = require('../data/connector');
var entityManager = require('../data/EntityManager');
var tableInfo = require('../init').tableInfo;



router.get(/.*/, function(req, res, next) {
  console.log("I have made the request niiiiice");
  console.log(req.url);
  //given the url pull DB information

  getData(req.url).then(data => {
    columns = Object.keys(data[0]);
    table = req.url.substr(1).split('/')[0]
    let responseData = {"data":{"data": data, "columns": columns},"metadata":{ "keys": tableInfo[table].metadata.keys}};
    //console.log(responseData.keys);
    console.log(tableInfo['sample'].metadata.keys);
    res.send(responseData);
  });
  });

async function getData(url){
    let path = url.substr(1).split('/');
    let queryString = "SELECT * FROM " + path +  ";";


     console.log("Retrieving Samples");
     console.log(queryString);
    let result = await db.query(queryString, null)
    return result.rows;

}


module.exports = router;