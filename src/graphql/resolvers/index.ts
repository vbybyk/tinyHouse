import merge from "lodash.merge";
import { listingResolvers } from "./Listing";
import { bookingResolvers } from "./Booking";
import { userResolvers } from "./User";
import { viewerResolver } from "./Viewer";

export const resolvers = merge(userResolvers, viewerResolver, listingResolvers, bookingResolvers)