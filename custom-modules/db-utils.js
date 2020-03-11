/******************************************************************
 * 
 *                     CREATION DES FONCTIONS
 *
 ******************************************************************/

/**********************************
 *  IMPORTATION DE LA  CONNEXION 
 **********************************/

// Import de la connexion à la BD
const db = require('./db');


/**************************************************************
 *                  GESTION DES REQUETES SQL
 **************************************************************/

 // Gestion des requêtes SQL qui ne retourne pas de lignes
 // (DELETE, UPDATE, INSERT)
 const handleQuery = (err, response, messageText) => {
    if(err){
        response.status(500).json({success: false, error: err});
    } else {
        response.json({success: true, message: messageText});
    }

}


// Gestion des requêtes SQL de type SELECT(qui retourne des lignes)
const handleSelectQuery = (err, response, data) => {
    if(err){
        response.status(500).json({success: false, error: err});
        //Sinon si j'ai un tableau vide
    } else if(!data || data.length == 0){
        // je revois une erreur
        response.status(404).json({success: false, error: 'non trouvé'});
        //si mon tableau est égal à 1
    } else if(data.length == 1){
        // si j'ai un tableau qui est égal à un résultat je retour que le tableau
        response.json({success: true, results: data[0]});
    } else {
        // si j'ai plusieurs résultat, je retourne tout le tableau pour faire une boucle 
        response.json({success: true, results: data});
    }
}



 /**************************************************
 *             FONCTION DE REQUETAGE SQL
 * @param {*} sql 
 * @param {*} data 
 **************************************************/

// Fonction de requetage SQL qui enrobe la méthode 
//de la bibliothèque mysql dans une promesse
const query = (sql, data) => {
    return new Promise((resolve, reject) => {
        db.query(sql, data, (err, rows) => {
            if(err){
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}





 /********************************
 * EXPORT DE MES UTILITAIRES
 ********************************/
module.exports = {
    handleQuery: handleQuery,
    handleSelectQuery: handleSelectQuery,
    query: query
}