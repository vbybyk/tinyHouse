import { Skeleton, List, Card } from "antd";

import listingLoadingCardCover from '../../assets/listing-loading-card-cover.jpg'

export const PremiumListingsSkeleton = () => {
  const emptyData = [{}, {}, {}, {}];

  return(
    <div className="home-listings-skeleton">
      {/* <Skeleton paragraph={{ rows: 0 }} /> */}
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4
        }}
        dataSource={emptyData}
        renderItem={() => (
          <List.Item className="home-listing-skeleton-item">
            <Card
              cover={
                <div
                  style={{ backgroundImage: `url(${listingLoadingCardCover})` }}
                  className="home-listings-skeleton__card-cover-img"
                ></div>
              }
              loading
            />
          </List.Item>
        )}
      />
    </div>
  )
}