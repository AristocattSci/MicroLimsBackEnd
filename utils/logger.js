const fs = require('fs');




function writeFileSimple(path, content) {

    
    fs.writeFile(path, content, (err) =>{
        if (err) throw err;
        //console.log(err);
    });
}

exports.writeFileSimple = writeFileSimple;

