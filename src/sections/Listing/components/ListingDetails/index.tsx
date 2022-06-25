import { Link } from "react-router-dom";
import { iconColor } from "../../../../lib/utils";
import { Typography, Avatar, Divider, Tag } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { Listing as ListingData } from "../../../../lib/graphql/queries/Listing/__generated__/Listing";

interface Props {
  listing: ListingData["listing"];
}

const { Paragraph, Title } = Typography

export const ListingDetails = ({listing} : Props) => {

  const { title, address, description, image, host, numOfGuests, city, type } = listing;

  return(
    <div className="listing-details">
        <div 
          className="listing-details__image" 
          style={{backgroundImage: `url(${image})`}}>
        </div>
        <div className="listing-details__information">
            <Paragraph type="secondary" ellipsis className="listing-details__city-address">
                <Link to={`/listings/${city}`}>
                  <EnvironmentOutlined style={{color: `${iconColor}`}}/>
                  {city}
                </Link>
                <Divider type="vertical"/>
                {address}
            </Paragraph>
            <Title level={3} className="listing-details__title">
              {title}
            </Title>
        </div>
        <Divider/>

        <div className="listing-details__section">
          <Link to={`/user/${host.id}`}>
            <Avatar src={host.avatar} size={64} />
            <Title level={2} className="listing-details__host-name">
              {host.name}
            </Title>
          </Link>
        </div>

        <Divider/>

        <div className="listing-details__section">
        <Title level={4}>About this space</Title>
        <div className="listing-details__about-items">
          <Tag color="magenta">{type}</Tag>
          <Tag color="magenta">{numOfGuests} Guests</Tag>
        </div>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>{description}</Paragraph>
      </div>
    </div>
  )

}