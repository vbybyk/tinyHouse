import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./graphql";
 
const app = express();
const port = 9000;

const server = new ApolloServer({schema})

const startServer = async() => {
    await server.start();
    server.applyMiddleware({app, path: "/api"})
}
startServer()



app.listen(port)

console.log(`Example app listening on port ${port}`)
