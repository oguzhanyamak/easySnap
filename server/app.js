const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { PubSub } = require('graphql-subscriptions');
const { importSchema } = require('graphql-import');
const mongoose = require('mongoose');
const http = require('http');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const cors = require('cors');
const { makeExecutableSchema } = require('@graphql-tools/schema');

require('dotenv').config();
const resolvers = require('./graphql/resolvers/index');

const User = require('./models/user');
const Snap = require('./models/snap');

async function startServer() {
    const pubsub = new PubSub();
    
    // Şemayı oluştur
    const typeDefs = importSchema('./graphql/schema.graphql');
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const server = new ApolloServer({
        schema,
        context: {
            User,
            Snap,
            pubsub
        },
        cors: {
            origin: '*',
            credentials: true
        }
    });

    await server.start();

    mongoose.connect(process.env.MONGO_DB_CONN, { dbName: process.env.MONGO_DB_NAME }).then(() => console.log('Connected to MongoDB')).catch((err) => console.log(err));
    const app = express();
    
    // CORS ayarları
    app.use(cors({
        origin: '*',
        credentials: true
    }));

    server.applyMiddleware({ 
        app,
        cors: {
            origin: '*',
            credentials: true
        }
    });

    const httpServer = http.createServer(app);
    
    // WebSocket sunucusunu oluştur
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
        cors: {
            origin: '*',
            credentials: true
        }
    });

    // GraphQL subscription sunucusunu başlat
    useServer({ 
        schema,
        context: async (ctx) => {
            return {
                User,
                Snap,
                pubsub
            };
        }
    }, wsServer);

    httpServer.listen({ port: 4000 }, () => {
        console.log('Server Ready at 4000 Port')
    });
}

startServer();