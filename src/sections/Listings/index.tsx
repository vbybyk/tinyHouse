import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Typography, List, Layout } from "antd";
import { ListingCard } from "../../lib/components";
import { ListingsFilters, ListingsPagination } from "./components";
import { LISTINGS } from "../../lib/graphql/queries";
import { ListingsFilter } from "../../lib/graphql/globalTypes";
import { Listings as ListingsData, ListingsVariables } from "../../lib/graphql/queries/Listings/__generated__/Listings";

const { Title, Paragraph, Text } = Typography
const { Content } = Layout

type MatchParams = {
  location: string
}

const PAGE_LIMIT = 8;
const FILTER = ListingsFilter.PRICE_HIGH_TO_LOW

export const Listings = () => {

  const [listingsFilter, setListingsFilter] = useState(FILTER)
  const [listingsPage, setListingsPage] = useState(1)

  const { location } = useParams<MatchParams>() as MatchParams;

  const { data, loading } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
      variables: {
        location,
        filter: listingsFilter,
        limit: PAGE_LIMIT,
        page: listingsPage
      }
  })

  const listings = data?  data.listings : null;
  const listingsRegion = listings ? listings.region : null;


  const LIMIT = 8

  const listingsSectionElement = listings && listings.result.length ? 
      <div>
        <ListingsPagination 
          total={listings.total}
          page={listingsPage}
          limit={LIMIT}
          setPage={setListingsPage}/>
        <ListingsFilters filter={listingsFilter} setFilter={setListingsFilter}/>
        <List 
            grid={{
              gutter: 8,
              xs: 1,
              sm: 2,
              lg: 4
            }}
            dataSource={listings.result}
            // pagination={{
            //   position: "top",
            //   current: listingsPage,
            //   total: listings.total,
            //   defaultPageSize: LIMIT,
            //   // hideOnSinglePage: true,
            //   showLessItems: true,
            //   onChange: (page: number) => setListingsPage(page),
            //   className: "listings-pagination"
            // }}
            renderItem={item => (
              <List.Item className="listing-card-item">
                <ListingCard listing={item}/>
              </List.Item>
          )}
        />
      </div>
        :(
      <div>
        <Paragraph>
          It appears that no listings have yet been created for{" "}
          <Text mark>"{listingsRegion}"</Text>
        </Paragraph>
        <Paragraph>
          Be the first person to create a <Link to="/host">listing in this area</Link>!
        </Paragraph>
      </div>
    );
    

    // const renderListingsSection = () => {
    //   if(loading){
    //     return <PremiumListingsSkeleton/>
    //   } 
    //   if(result){
    //     return premiumListingsList
    //   }
    //   return null
    // }

  const listingsRegionElement = listingsRegion ? (
    <Title level={3} className="listings__title">
      Results for "{listingsRegion}"
    </Title>
  ) : null;

  return(
    <Content className="listings">
      {listingsRegionElement}
      {listingsSectionElement}
    </Content>
  )
}