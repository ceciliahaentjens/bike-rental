require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const debug = require('debug')('app:server');
const app = require('./app');

const port = process.env.PORT ?? 3000;

const server = new ApolloServer(app);

// The `listen` method launches a web server.
server.listen(port).then(({ url }) => {
    debug(`🚀  Server ready at ${url}`);
});
