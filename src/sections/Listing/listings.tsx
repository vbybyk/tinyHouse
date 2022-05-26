import {server} from '../../lib'
import {ListingsData, DeleteListingData, DeleteListingVariables} from './types'

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

  const fetchListings = async () => {
    const {data} = await server.fetch<ListingsData>({ query : LISTINGS})
    console.log(data)
  }

  const deleteListings = async () => {
    const {data} = await server.fetch<DeleteListingData, DeleteListingVariables>({ 
      query : DELETE_LISTING,
      variables : {
        id: '628d0740bb66f768127d42cf'}
      })
    console.log(data)
  }


  return (
    <div className="Listings">
        <h1>{title}</h1>
        <button onClick={fetchListings}>Fetch listings</button>
        <button onClick={deleteListings}>Delete listing</button>
    </div>
  );
}
