import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PageSkeleton, ErrorBanner } from "../../lib/components";
import { Layout, Row, Col } from "antd";
import { Moment} from "moment";
import { Viewer } from "../../lib/types";
import { LISTING } from "../../lib/graphql/queries";
import { Listing as ListingData, ListingVariables } from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { 
    ListingDetails, 
    ListingBookings, 
    ListingCreateBooking,
    ListingCreateBookingModal } from './components/'

type MatchData = {
  id: string
}

interface Props {
  viewer: Viewer
}

const { Content } = Layout;

const PAGE_LIMIT = 3

export const Listing = ({viewer}: Props) => {
  
  const [bookingsPage, setBookingsPage] = useState(1);
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
  const [modalVisible, setModalVisible] = useState(false)
  const { id } = useParams<MatchData>() as MatchData;

  const stripePromise = useMemo(() => loadStripe(`${process.env.REACT_APP_S_PUBLISHABLE_KEY}`), []);

  const {data, loading, error, refetch} = useQuery<ListingData, ListingVariables>(LISTING, {
    variables: {
      id,
      bookingsPage,
      limit: PAGE_LIMIT
    }
  })

  const clearBookingData = () => {
    setModalVisible(false);
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const handleListingRefetch = async () => {
    await refetch();
  };

  if(loading){
    <Content className="listing">
        <PageSkeleton/>
    </Content>
  }

  if (error) {
    return (
      <Content className="listing">
        <ErrorBanner description="This listing may not exist or we've encountered an error. Please try again soon." />
        <PageSkeleton />
      </Content>
    );
  }

  const listing = data? data.listing : null;
  const listingBookings = listing? listing.bookings : null

  const listingDetailsElement = listing? <ListingDetails listing={listing}/> : null

  const listingBookingsElement = listingBookings? 
    <ListingBookings 
        listingBookings={listingBookings}
        bookingsPage={bookingsPage}
        limit={PAGE_LIMIT}
        setBookingsPage={setBookingsPage}
        /> 
        : null
  
  const listingCreateBookingElement = listing? 
    <ListingCreateBooking 
        price={listing.price}
        viewer={viewer}
        host={listing.host}
        bookingsIndex={listing.bookingsIndex}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        setModalVisible={setModalVisible}
        /> : null;
  
  const listingCreateBookingModalElement = listing && checkInDate && checkOutDate? 
  <Elements stripe={stripePromise}>
    <ListingCreateBookingModal
    id={listing.id} 
    price={listing.price}
    checkInDate={checkInDate}
    checkOutDate={checkOutDate}
    modalVisible={modalVisible}
    setModalVisible={setModalVisible}
    clearBookingData={clearBookingData}
    handleListingRefetch={handleListingRefetch}/>
  </Elements> : null
  
  return(
    <Content className="listings">
      <Row gutter={24} justify="space-between">
        <Col xs={24} lg={14}>
          {listingDetailsElement}
          {listingBookingsElement}
        </Col>
        <Col xs={12} lg={10}>
          {listingCreateBookingElement}
        </Col>
      </Row>
      {listingCreateBookingModalElement}
    </Content>
  )
}