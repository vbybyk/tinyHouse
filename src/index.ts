
import express, {Application} from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDataBase } from "./database";
import {typeDefs, resolvers } from "./graphql";
 
// const port = 9000;

const mount = async (app: Application) => {
    const db = await connectDataBase();
    const server = new ApolloServer({typeDefs, resolvers, context: () => ({ db })});
    const startServer = async() => {
        await server.start();
        server.applyMiddleware({app, path: "/api"})
    }
    startServer()
    app.listen(process.env.PORT)

    console.log(`Example app listening on port ${process.env.PORT}`)

    const listings = await db.listings.find({}).toArray();
    console.log(listings)
}

mount(express());

