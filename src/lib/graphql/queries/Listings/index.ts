import { gql } from "@apollo/client";

export const LISTINGS = gql`
  query Listings($filter: ListingsFilter!, $limit: Int!, $page: Int! ){
      listings(filter: $filter, limit: $limit, page: $page){
        total,
        result{
          id
          title
          image
          address
          price
          numOfGuests
          }
      }
  }
`