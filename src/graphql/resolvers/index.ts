import merge from "lodash.merge";
// import { listingsResolvers } from "./Listing";
import { viewerResolver } from "./Viewer";

export const resolvers = merge(viewerResolver)