import { IResolvers } from "@graphql-tools/utils";

export const userResolver : IResolvers = {
  Query: {
    user: () => "user.Query"
  }
}