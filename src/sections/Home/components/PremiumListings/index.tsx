import { useState } from "react";
import { useQuery } from "@apollo/client";
import { Typography, List } from "antd";
import { ListingCard } from "../../../../lib/components";
import { PremiumListingsSkeleton } from "../PremiumListingsSkeleton";
import { LISTINGS } from "../../../../lib/graphql/queries";
import { ListingsFilter } from "../../../../lib/graphql/globalTypes";
import { Listings as ListingsData, ListingsVariables } from "../../../../lib/graphql/queries/Listings/__generated__/Listings";

const { Title, Paragraph } = Typography

const PAGE_LIMIT = 4;
const FILTER = ListingsFilter.PRICE_HIGH_TO_LOW

export const PremiumListings = () => {

  const [listingsFilter, setListingsFilter] = useState(FILTER)
  const [listingsPage, setListingsPage] = useState(1)

  const { data, loading, error} = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
      variables: {
        filter: listingsFilter,
        limit: PAGE_LIMIT,
        page: listingsPage
      }
  })

  const listings = data?  data.listings : null;

  const result = listings?.result 
  
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
        Listings
      </Title>
      {renderListingsSection()}
    </div>
  )
}