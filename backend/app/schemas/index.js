/**
 * Ce fichier sert à la validation des données, la documentation, mais également le routage
 * Plugin VSCode pour graphQL : https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode
 */

const { gql } = require('apollo-server');
const { readFileSync } = require('fs');
const path = require('path');

// Types
const example = readFileSync(path.join(__dirname, './example.gql'));

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
    ${example}

    ${query}

    ${mutation}
`;

module.exports = schema;
