import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PageSkeleton, ErrorBanner } from "../../lib/components";
import { Layout, Row, Col } from "antd";
import { Moment} from "moment";
import { LISTING } from "../../lib/graphql/queries";
import { Listing as ListingData, ListingVariables } from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { ListingDetails, ListingBookings, ListingCreateBooking } from './components/'

type MatchData = {
  id: string
}

const { Content } = Layout;

const PAGE_LIMIT = 3

export const Listing = () => {
  
  const [bookingsPage, setBookingsPage] = useState(1);
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
  const { id } = useParams<MatchData>() as MatchData;

  const {data, loading, error} = useQuery<ListingData, ListingVariables>(LISTING, {
    variables: {
      id,
      bookingsPage,
      limit: PAGE_LIMIT
    }
  })

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
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        setCheckInDate={setCheckInDate}
        setCheckOutDate={setCheckOutDate}
        /> : null;
  
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
    </Content>
  )
}