const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const {importSchema} = require('graphql-import');

const resolvers = require('./graphql/resolvers/index');

async function startServer() {
    const server = new ApolloServer({
        typeDefs: importSchema('./graphql/types/schema.graphql'),
        resolvers
    });

    await server.start();

    const app = express();
    server.applyMiddleware({app});

    app.listen({port:4000}, () => {
        console.log('Server Ready at 4000 Port')
    });
}

startServer();