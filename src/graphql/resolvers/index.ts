import merge from "lodash.merge";
// import { listingsResolvers } from "./Listing";
import { userResolvers } from "./User";
import { viewerResolver } from "./Viewer";

export const resolvers = merge(userResolvers, viewerResolver)