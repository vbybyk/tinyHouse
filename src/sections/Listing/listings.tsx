import { useState } from 'react';
import {server} from '../../lib'
import {ListingsData, Listing, DeleteListingData, DeleteListingVariables} from './types'

interface Props {
    title: string;
}

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`

export const Listings = ({title} : Props) => {

  const [listings, setListings] = useState<Listing[] | null>(null)

  const fetchListings = async () => {
    const {data} = await server.fetch<ListingsData>({ query : LISTINGS})
    setListings(data.listings)
  }

  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({ 
      query : DELETE_LISTING,
      variables : {
        id: id}
    })
  fetchListings();
  }

  const listingsList = listings? listings.map(({title, id}) => 
    {
      return( 
        <ul key={id}>
              <li>{title}</li>
              <button onClick={() => deleteListings(id)}>Delete</button>
        </ul>)
    }
  ) : null


  return (
    <div className="Listings">
        <h1>{title}</h1>
        <button onClick={fetchListings}>Fetch listings</button>
        {listingsList}
    </div>
  );
}
