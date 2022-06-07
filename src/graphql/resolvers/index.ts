import merge from "lodash.merge";
// import { listingsResolvers } from "./Listing";
import { userResolver } from "./User";
import { viewerResolver } from "./Viewer";

export const resolvers = merge(userResolver, viewerResolver)