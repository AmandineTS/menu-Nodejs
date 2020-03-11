/***************************************************
 *          IMPORTATION DES BIBLIOTHEQUES
 ***************************************************/

//1: Importation de la bibliothèque(module) express
const express =  require('express');

//12: Import de la bibliothèque
const fs = require('fs');

//17: Import de la bibliothèque bodyParser
const bodyParser = require('body-parser');


/********************************************
 *      INITIALISATION DE L'APPLICATION
 ********************************************/
//2: Initialisation de l'application express
const app = express();


/*************************************************************
 *             IMPORTATION DES MODULES DE ROUTAGE
 *************************************************************/
// Importation du module de routage (dossier: routes/pizzas)
const pizzasRoute = require('./routes/pizzas');


/*****************************************************
*   Middleware de récupération des données postées
******************************************************/
//..récupération depuis un appel JAVASCRIPT
app.use(bodyParser.json());
//..réupération depuis un formulaire HTML
app.use(bodyParser.urlencoded({extended: false}));




/*****************************************************************
 *  UTILISATION DES ROUTES DU MODULE DANS LE DOSSIER "ROUTES"
 *****************************************************************/

//Utilisation de la route du module (dossier: routes/auteurs)
app.use(pizzasRoute);




/***************************************************************
 *           EXECUTION DU PORT DE L'APPLICATION 
 **************************************************************/

//3: L'application écoute le port 
app.listen(3000,
    //4: Callback de succès exécuté quand le serveur à démarré
    () => {
    console.log('Application lancée')
});
