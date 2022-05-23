import { GraphQLSchema, 
        GraphQLObjectType,
        GraphQLList, 
        GraphQLString, 
        GraphQLID, 
        GraphQLInt,
        GraphQLNonNull } from "graphql";
import {listings} from './listings'

const Listing = new GraphQLObjectType({
  name: "Listing",
  fields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    image: {type: new GraphQLNonNull(GraphQLString)},
    address: {type: new GraphQLNonNull(GraphQLString)},
    price: {type: new GraphQLNonNull(GraphQLInt)},
    numOfGuests: {type: new GraphQLNonNull(GraphQLInt)},
    numOfBeds: {type: new GraphQLNonNull(GraphQLInt)},
    numOfBaths: {type: new GraphQLNonNull(GraphQLInt)},
    rating: {type: new GraphQLNonNull(GraphQLInt)}
  }
})

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
      listings: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Listing))),
        resolve: () => {
          return listings}
      }
  }
})

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
      deletedListing: {
        type: new GraphQLNonNull(Listing),
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLID)}
        },
        resolve: (_root, {id}) => {
          for (let i = 0; i < listings.length; i++){
            if(listings[i].id === id){
            return listings.splice(i, 1)[0]
         }
     }
     return new Error('delete error')
        }
      }
  }
})

export const schema = new GraphQLSchema({query, mutation})