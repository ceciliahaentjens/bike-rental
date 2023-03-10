/**
 * Ce fichier sert à la validation des données, la documentation, mais également le routage
 * Plugin VSCode pour graphQL : https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode
 */

const { gql } = require('apollo-server');
const { readFileSync, read } = require('fs');
const path = require('path');

// Scalars
const scalars = readFileSync(path.join(__dirname, './scalars.gql'));

// Types
const example = readFileSync(path.join(__dirname, './example.gql'));
const pointOfSale = readFileSync(path.join(__dirname, './pointOfSale.gql'));
const rent = readFileSync(path.join(__dirname, './rent.gql'));
const kindOfBike = readFileSync(path.join(__dirname, './kindOfBike.gql'));
const bike = readFileSync(path.join(__dirname, './bike.gql'));

// Query and mutations
const query = readFileSync(path.join(__dirname, './query.gql'));
const mutation = readFileSync(path.join(__dirname, './mutation.gql'));

/*
 Les gabarits étiquetés (tagged templates)
 sont une forme plus avancée de gabarits.
 On peut ici utiliser une fonction pour analyser les différents fragments du gabarit.
 https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Litt%C3%A9raux_gabarits
 */

const schema = gql`
    ${scalars}

    ${example}

    ${pointOfSale}

    ${rent}

    ${kindOfBike}

    ${bike}

    ${query}

    ${mutation}
`;

module.exports = schema;
