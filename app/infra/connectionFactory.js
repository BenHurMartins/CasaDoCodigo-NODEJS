var mysql = require('mysql');
//FACTORY METHOD
function createDBConnection() {
    if (!process.env.NODE_ENV) {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs'
        });
    }

    if (process.env.NODE_ENV == 'test') {
      console.log("entrou no teste");
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'casadocodigo_nodejs_test'
        });
    }

    if (process.env.NODE_ENV == 'production') {
        // caso for usar expressao regular para extrair
        // os dados da variavel de ambiente urlDeConexao = process.env.CLEARDB_DATABASE_URL;
        return mysql.createConnection({
            host: 'us-cdbr-iron-east-05.cleardb.net',
            user: 'bf4f8e6d27b3fa',
            password: 'c8dca12f',
            database: 'heroku_ec2b81128fc738b'
        });
    }

}

//warpper
module.exports = function() {
    return createDBConnection;
}
