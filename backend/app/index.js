const depthLimit = require('graphql-depth-limit');

// Schemas & Resolvers
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

// Database
const db = require('./db/pg');

// DataSources
const PointOfSale = require('./datasources/pointOfSale');

const knexConfig = {
    client: 'pg',
    establishedConnection: db,
};

module.exports = {
    typeDefs,
    resolvers,
    dataSources: () => ({
        pointOfSale: new PointOfSale(knexConfig),
    }),
    validationRules: [depthLimit(5)],
};
