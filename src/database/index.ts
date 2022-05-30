import { MongoClient } from "mongodb";
import { Database, User, Booking, Listing } from "../lib/types";

const user = process.env.DB_USER;
const userPassword = process.env.DB_USER_PASSWORD;
const cluster = process.env.DB_CLUSTER

const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/?retryWrites=true&w=majority`

export const connectDataBase = async(): Promise<Database> => {
  const client = await MongoClient.connect(url)
  const db = client.db("main")

  return {
    listings: db.collection<Listing>("listings"),
    bookings: db.collection<Booking>("bookings"),
    users: db.collection<User>("users"),
  }
};