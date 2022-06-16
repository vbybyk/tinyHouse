import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Typography, List } from "antd";
import { ListingCard } from "../../../../lib/components";
import { PremiumListingsSkeleton } from "../PremiumListingsSkeleton";
import { LISTINGS } from "../../../../lib/graphql/queries";
import { ListingsFilter } from "../../../../lib/graphql/globalTypes";
import { Listings as ListingsData, ListingsVariables } from "../../../../lib/graphql/queries/Listings/__generated__/Listings";

const { Title } = Typography

const PAGE_LIMIT = 4;
const FILTER = ListingsFilter.PRICE_HIGH_TO_LOW

export const PremiumListings = () => {

  // const [listingsFilter, setListingsFilter] = useState(FILTER)
  const [listingsPage, setListingsPage] = useState(1)

  const { data, loading } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
      variables: {
        filter: FILTER,
        limit: PAGE_LIMIT,
        page: listingsPage
      }
  })

  const listings = data?  data.listings : null;

  const result = listings?.result 
  const total = listings?.total
  const LIMIT = 4

  const premiumListingsList = (
      <List 
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4
          }}
          dataSource={result}
          locale={{ emptyText: "User doesn't have any listings yet!" }}
          pagination={{
            position: "top",
            current: listingsPage,
            total,
            defaultPageSize: LIMIT,
            // hideOnSinglePage: true,
            showLessItems: true,
            onChange: (page: number) => setListingsPage(page)
          }}
          renderItem={item => (
            <List.Item className="listing-card-item">
               <ListingCard listing={item}/>
            </List.Item>
        )}
      />
    )

    const renderListingsSection = () => {
      if(loading){
        return <PremiumListingsSkeleton/>
      } 
      if(result){
        return premiumListingsList
      }
      return null
    }

  return(
    <div className="user-listings">
      <Title level={4} className="user-listings__title">
        Premium Listings
      </Title>
      {renderListingsSection()}
    </div>
  )
}