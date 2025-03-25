const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } = require('graphql-import');
const mongoose = require('mongoose');

require('dotenv').config();
const resolvers = require('./graphql/resolvers/index');

const User = require('./models/user');
const Snap = require('./models/snap');

async function startServer() {
    const server = new ApolloServer({
        typeDefs: importSchema('./graphql/schema.graphql'),
        resolvers,
        context:{
            User,
            Snap
        }
    });

    await server.start();

    mongoose.connect(process.env.MONGO_DB_CONN, { dbName: process.env.MONGO_DB_NAME }).then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));
    const app = express();
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
        console.log('Server Ready at 4000 Port')
    });
}

startServer();