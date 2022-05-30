import { Collection, ObjectId } from "mongodb";

export interface Booking {
  _id: ObjectId;
}

export interface User {
  _id: ObjectId;
}

export interface Listing {
  _id: ObjectId;
  // title: string;
  // image: string;
  // address: string;
  // price: number;
  // numOfGuests: number;
  // numOfBeds: number;
  // numOfBaths: number;
  // rating: number;
}

export interface Database {
  users: Collection<User>,
  bookings: Collection<Booking>
  listings: Collection<Listing>
}