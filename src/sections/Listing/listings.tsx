import {server, useQuery} from '../../lib'
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

  // const [listings, setListings] = useState<Listing[] | null>(null)
  
  // useEffect(() => {
  //   fetchListings();
  // }, [])

  // const fetchListings = async () => {
  //   const {data} = await server.fetch<ListingsData>({ query : LISTINGS})
  //   setListings(data.listings)
  // }

  const {data, refetch} = useQuery<ListingsData>(LISTINGS)

  const deleteListings = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({ 
      query : DELETE_LISTING,
      variables : {
        id: id}
    })
  refetch();
  }

  const listings = data? data.listings : null

  const listingsList = listings? listings.map(({title, id}) => 
    {
      return( 
        <ul key={id}>
              <li>{title}<button onClick={() => deleteListings(id)}>Delete</button></li>
              
        </ul>)
    }
  ) : null


  return (
    <div className="Listings">
        <h1>{title}</h1>
        {listingsList}
    </div>
  );
}
