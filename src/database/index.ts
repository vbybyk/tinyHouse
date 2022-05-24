import { MongoClient } from "mongodb";

const user = "vbybyk";
const userPassword = "mongovbybyk21";
const cluster = "cluster0.antv1"

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/?retryWrites=true&w=majority`

export const connectDataBase = async() => {
  const client = await MongoClient.connect(url)
  const db = client.db("main")

  return {
    listings: db.collection("listings")
  }
};