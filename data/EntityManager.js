
parseDataRequest({"rows":"hi"},'sample');

function parseDataRequest(json, table){
    let parsedJson = {};
    parsedJson['data'] = json['rows'];
    parsedJson.metadata = getMetaData(table);
    console.log(parsedJson);

}

function getMetaData(table){
    //retrieve table information....
}