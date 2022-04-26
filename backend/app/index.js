const depthLimit = require('graphql-depth-limit');

// Schemas & Resolvers
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

// Database
const db = require('./db/pg');

// DataSources
const Rate = require('./datasources/rate');
const Rent = require('./datasources/rent');
const PointOfSale = require('./datasources/pointOfSale');
const KindOfBike = require('./datasources/kindOfBike');
const Bike = require('./datasources/bike');

const knexConfig = {
    client: 'pg',
    establishedConnection: db,
};

module.exports = {
    typeDefs,
    resolvers,
    dataSources: () => ({
        // REST
        rate: new Rate(),
        // SQL
        rent: new Rent(knexConfig),
        pointOfSale: new PointOfSale(knexConfig),
        kindOfBike: new KindOfBike(knexConfig),
        bike: new Bike(knexConfig),
    }),
    validationRules: [depthLimit(5)],
};
