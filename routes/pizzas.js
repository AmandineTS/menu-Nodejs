/*************************************************************************************
    *  
    *                            FICHIER DE ROUTAGE DES AUTEURS
    * 
**************************************************************************************/

/******************************************
 *     IMPORTATION DE LA BIBLIOTHEQUE
 ******************************************/
// Importation de la bibliothèque "express"
const express = require('express');



/******************************************
 *          CREATION DU ROUTER
 ******************************************/
// Création du router à partir d'express
const router = express.Router();



/*********************************************
 *     IMPORTATION DU MODULE DE CONNEXION
 *********************************************/
// Importation du module de connexion à la BD
const db = require('../custom-modules/db');



/*******************************************************
 *    IMPORTATION DES UTILITAIRES
 *******************************************************/
// Importation des outils de traitement des requêtes sql
const dbUtils = require('../custom-modules/db-utils');


/***********************************************************************
 *                      DEFINITION DES ROUTES
 ***********************************************************************/

 // Afficher toutes les pizzas avec leur prix
router.get('/pizza', (request, response) => {
    db.query('SELECT * FROM vues_pizzas', (err, rows) => {
        dbUtils.handleSelectQuery(err, response, rows);
    });
});

// Afficher le détail d'une pizza avec la liste d'ingrédients
router.get('/pizza/:id', (request, response) => {
    db.query('SELECT * FROM vues_ingredients WHERE id=?',
    [request.params.id],
    (err, rows) => {
        dbUtils.handleSelectQuery(err, response, rows);
    }
    );
});

// Ajouter une pizza avec ses ingrédients
router.post('/pizza', (request, response) => {
    const newPizza = {
        nom: request.body.nom,
        base: request.body.base
    };

    let pizzaId = null;

    dbUtils.query('INSERT INTO pizzas SET ?', newPizza)
            .then( (data) => {
                pizzaId = data.insertId;

                let ingredientData = [];

                for(let idIngredient of request.body.idIngredient.split(',')){
                    ingredientData.push([pizzaId, idIngredient]);
                }

                const insertIngredient = dbUtils.query(
                    'INSERT INTO recettes (id_pizza, id_ingredient) VALUES ?',
                    [ingredientData]);
                    return insertIngredient;
            })

            .then( (data) => {
                response.json({success: true, message: 'Ajout de la pizza et de l\'ingredient'});
            })

            .catch( (err) => {
                response.status(500).json({success: false, error: err});
            });

});






 /****************************
 *    EXPORTATION DU MODULE
 ****************************/
 // Exportation du module
 module.exports = router;
