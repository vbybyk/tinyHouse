import express from "express";
import { listings } from "./listings";
import bodyParser from "body-parser";
 
const app = express();
const port = 9000;

app.get('/', (_req, res) => {
    res.send('hi there common man man!')
})

app.get('/listings', (_req, res) => {
    res.send(listings)   
})

app.use(bodyParser.json())

app.post('/delete-listing', (req, res) => {
    const id: string = req.body.id
    console.log(id);
    for (let i = 0; i < listings.length; i++){
        console.log(listings[i]);
        if(listings[i].id === id){
           return res.send(listings.splice(i, 1))
        }
    }
    return res.send('delete error')
})

app.listen(port)

console.log(`Example app listening on port ${port}`)
