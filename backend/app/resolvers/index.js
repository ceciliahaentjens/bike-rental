// Scalars
// @see : https://www.graphql-scalars.dev/docs
const {
    DateTimeResolver: DateTime,
} = require('graphql-scalars');

// Types
const Bike = require('./bike');
const Rent = require('./rent');
// Query and mutations
const Query = require('./query');
const Mutation = require('./mutation');

module.exports = {
    DateTime,

    Bike,

    Rent,

    // Liste des actions de récupération possibles
    Query,

    // Liste des actions de mise à jour des données possibles
    Mutation,
};
