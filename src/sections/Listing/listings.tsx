import {useQuery, useMutation, gql} from '@apollo/client'
import {ListingsData, DeleteListingData, DeleteListingVariables} from './types'

interface Props {
    title: string;
}

const LISTINGS = gql`
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

const DELETE_LISTING = gql`
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

  const {data, loading, error, refetch} = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing, {loading: deleteListingLoading, error: deleteListingError}
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING)

  const handleDeleteListings = async (id: string) => {
    await deleteListing({ variables : { id }})
    // await server.fetch<DeleteListingData, DeleteListingVariables>({ 
    //   query : DELETE_LISTING,
    //   variables : {
    //     id: id}
    // })
  refetch();
  }

  const listings = data? data.listings : null

  const listingsList = listings? listings.map(({title, id}) => 
    {
      return( 
        <ul key={id}>
              <li>{title}<button onClick={() => handleDeleteListings(id)}>Delete</button></li>
              
        </ul>)
    }
  ) : null
  
  if(loading){
    return <h2>Loading...</h2>
  }

  if(error) {
    return <h2>Something went wrong</h2>
  }

  const deleteListingLoadingMessage = deleteListingLoading? <h2>Delete in progress...</h2> : null;
  const deleteListingErrorMessage = deleteListingError? <h2>Ooops, can't delete it now</h2> : null;

  return (
    <div className="Listings">
        <h1>{title}</h1>
        {listingsList}
        {deleteListingLoadingMessage}
        {deleteListingErrorMessage}
    </div>
  );
}
