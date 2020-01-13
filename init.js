let db = require('./data/connector');
let logger = require('./utils/logger');
let path = require('path');

let keys = {};
let tables = {};
let tableInfo = {};

//initTableData();

//File responsible for initialization of various globals.
async function initTableData(){
  await getTableData().then(function(res){
    setTableData(res);
  })
}


async function getTableData(){

    await getTables().then(function(res){
      tables = res;
    });
    await getKeys().then(function(res){
      keys = res;

    }); 

    return {"tables": tables, "keys":keys}

}

async function getTables(){
    let tables = {};
    let query = "select tab.table_name, col.column_name, col.data_type from information_schema.tables tab\
                 inner join information_schema.columns col on tab.table_name = col.table_name\
                 where tab.table_schema = 'public';"

    await db.query(query).then(res => {
    //console.log(err,res);
    tables.data = res['rows'];
    //console.log(res['rows'])

    //logger.writeFileSimple(path.join(__dirname, "./logs/tableSchema.json"), JSON.stringify(res, null, 4));

    //console.log(tables)
  }).catch(err =>{

  });
  return tables;

};
async function getKeys(){



    let query  = "SELECT\
    tc.constraint_name, \
	tc.constraint_type, \
    tc.table_name,\
    kcu.column_name,\
    ccu.table_name AS foreign_table_name, \
    ccu.column_name AS foreign_column_name \
FROM \
    information_schema.table_constraints AS tc \
    JOIN information_schema.key_column_usage AS kcu \
      ON tc.constraint_name = kcu.constraint_name \
      AND tc.table_schema = kcu.table_schema \
    JOIN information_schema.constraint_column_usage AS ccu \
      ON ccu.constraint_name = tc.constraint_name \
      AND ccu.table_schema = tc.table_schema \
	JOIN information_schema.tables tab on tc.table_name = tab.table_name \
WHERE tc.constraint_type in ('FOREIGN KEY', 'PRIMARY KEY');";
let keys = {};

  await db.query(query)
  .then(res => {
      //console.log(res);
      keys.metadata = res['rows'];
      //logger.writeFileSimple(path.join(__dirname, "./logs/tableKeys.json"), JSON.stringify(keys, null, 4));

      return keys;
  }).catch(err => {
    console.log(err);
  })
  return keys;
}

function setTableData(tableData){
  let keys = tableData.keys;
  let tables = tableData.tables;

  


  tables.data.forEach(res => {
    if (!tableInfo.hasOwnProperty(res.table_name)){
      tableInfo[res.table_name] = {"metadata": {"columns":[], "keys":[]}}
    }
    tableInfo[res.table_name].metadata.columns.push({"column_name":res.column_name, "data_type": res.data_type});

  });

  Object.keys(tableInfo).forEach(res => {
    console.log(res);
    keys.metadata.forEach(keyData => {
      if (keyData.table_name == res){
        tableInfo[res].metadata.keys.push(keyData);
      }
    })
  })

  logger.writeFileSimple(path.join(__dirname, "./logs/finalObject.json"), JSON.stringify(tableInfo,null, 4))
  console.log(tableInfo['test'].metadata.columns);
 // console.log(tableInfo.sample.metadata.columns);
}

exports.initTableData = initTableData;
exports.tableInfo = tableInfo;
