import express, {Application} from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { connectDataBase } from "./database";
import {typeDefs, resolvers } from "./graphql";
 
// const port = 9000;

const mount = async (app: Application) => {
    const db = await connectDataBase();

    app.use(cookieParser(process.env.SECRET))
    app.use(compression());

    app.use(express.static(`${__dirname}/client`));
    app.get("/*", (_req, res) => res.sendFile(`${__dirname}/client/index.html`));

    const server = new ApolloServer({
        typeDefs, 
        resolvers, 
        context: ({ req, res }) => ({ db, req, res })});
    const startServer = async() => {
        await server.start();
        server.applyMiddleware({app, path: "/api"})
    }
    startServer()
    app.listen(process.env.PORT)

    console.log(`App is listening on port ${process.env.PORT}`)
}

mount(express());

