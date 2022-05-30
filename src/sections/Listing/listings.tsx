import {useQuery, useMutation, gql} from '@apollo/client'
import {ListingsData, DeleteListingData, DeleteListingVariables} from './types'
import { List, Avatar, Button, Spin, Alert} from 'antd';
import { ListingsSkeleton } from './listingSkeleton';
import './styles/listingsStyles.css'

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

  const listingsList = listings? 
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={item.image} shape="square" size={48}/>}
            title={item.title}
            description={item.address}
          />
          <Button type="primary" onClick={() => handleDeleteListings(item.id)}>Delete</Button>
        </List.Item>
      )}
    /> : null
  
  if(loading){
    return (
      <div className='Listings'>
        <ListingsSkeleton title={title} />
      </div>
    )
  }

  if(error) {
    return(
      <div className='Listings'>
        <ListingsSkeleton title={title} error/>
      </div>
    )
  }

  const deleteListingErrorMessage = deleteListingError? 
    <Alert
      type="error"
      message="Uh oh! Something went wrong :(. Please try again later."
      className="listings__alert"
    />
   : null;

  return (
    <div className="Listings">
        {deleteListingErrorMessage}
        <Spin spinning={deleteListingLoading}>
          <h1>{title}</h1>
          {listingsList}
        </Spin>
    </div>
  );
}
