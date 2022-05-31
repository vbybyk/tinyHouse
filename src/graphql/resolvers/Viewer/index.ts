import { IResolvers } from "@graphql-tools/utils";

export const viewerResolver: IResolvers = {
    Query: {
      authUrl: () => "query.authUrl"
    },
    Mutation: {
      logIn: () => "login",
      logOut: () => "logOut"
    }
}