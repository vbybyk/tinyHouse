import {server} from '../../lib'

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

export const Listings = ({title} : Props) => {

  const fetchListings = async () => {
    const {data} = await server.fetch({ query : LISTINGS})
    console.log(data)
  }


  return (
    <div className="Listings">
        <h1>{title}</h1>
        <button onClick={fetchListings}>Fetch listings</button>
    </div>
  );
}
