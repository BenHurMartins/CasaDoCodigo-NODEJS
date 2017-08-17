var mysql = require('mysql');
//FACTORY METHOD
function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'casadocodigo_nodejs'
    });
}

//warpper
module.exports = function() {
    return createDBConnection;
}
