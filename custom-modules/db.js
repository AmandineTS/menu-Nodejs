/***************************************************************************
 * 
 *                       CONNEXION A LA BASE DE DONNEE
 *         
 ***************************************************************************/

// Importaion de la bibliothèque mysql
const mysql = require('mysql');

// Connexion au serveur de la BD
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    passeword: ''
});

// Connexion à la BD
connection.query('USE menu');

// Export de la connexion
module.exports = connection;