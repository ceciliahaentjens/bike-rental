// Types
// TODO

// Query and mutations
const Bike = require('./bike');
const Query = require('./query');
const Mutation = require('./mutation');

module.exports = {
    Bike,


    // Liste des actions de récupération possibles
    Query,

    // Liste des actions de mise à jour des données possibles
    Mutation,
};
