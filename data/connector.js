const { Pool } = require('pg');
const logger = require('../utils/logger');
const fs = require('fs');
let path = require('path')


let dbConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../connector.json')));

const pool = new Pool({
    user: dbConfig.username,
    host: dbConfig.host,
    database: dbConfig.database,
    password:dbConfig.password,
    port:dbConfig.port,
})
//client.connect()
//client.query('SELECT * from sample', (err, res) => {
//  console.log(err, res)
//  logger.writeFileSimple(path.join(__dirname, "../logs/database.json"), JSON.stringify(res, null, 4));
//  client.end()
//})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    }

}


