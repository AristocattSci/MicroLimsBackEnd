var db = require('./connector');



db.query('SELECT * FROM sample', null, (err,res) => {
    console.log(err);
    console.log(res.rows);
})