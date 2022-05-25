import { IResolvers } from "@graphql-tools/utils";
import { Database, Listing} from "../lib/types";
import { ObjectId } from "mongodb";

export const resolvers: IResolvers = {
    Query: {
      listings: async (
        _root: undefined,
        _args: Record<string, unknown>, 
        { db }: { db: Database }): Promise<Listing[]> => {
          return await db.listings.find({}).toArray()
      }
    },
    Mutation: {
      deleteListing: async (
        _root: undefined, 
        {id}: {id: string}, 
        { db }: { db: Database }): Promise<Listing> => {
        const deleteResult = await db.listings.findOneAndDelete({
          _id: new ObjectId(id)
        })

        if(!deleteResult.value){
          throw new Error('no delete result')
        }

        return deleteResult.value
      }
    },
    Listing: {
      id: (listings: Listing) => listings._id.toString()
    }
}