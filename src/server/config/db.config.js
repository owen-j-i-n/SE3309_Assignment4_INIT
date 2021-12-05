const mysql = require('mysql');

const dbcon = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'gymdb'
});

dbcon.connect(function(error){
    if(error) throw error;
    console.log('database connected');
});

module.exports = dbcon;