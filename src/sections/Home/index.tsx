import { useNavigate, Link } from "react-router-dom";
import { Col, Row, Layout, Typography } from "antd";
import { HomeHero } from "./components";
import { PremiumListings } from "./components";

import sanFransiscoImage from "./assets/san-fransisco.jpg";
import cancunImage from "./assets/cancun.jpg";

const { Content } = Layout;
const { Paragraph, Title } = Typography;

export const Home = () => {

  const navigate = useNavigate();
  const onSearch = (value: string) => {
    const trimmedValue = value.trim();

    if(trimmedValue){
      navigate(`/listings/${trimmedValue}`)
    }
  }

 

  return(
    <Content className="home">
        <HomeHero onSearch={onSearch}/>
        <div className="home__cta-section">
          <Title level={2} className="home__cta-section-title">
            Your guide for all things rental
          </Title>
          <Paragraph>Helping you make the best decisions in renting your last minute locations.</Paragraph>
          <Link to="/listings/united%20states" className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button">
            Popular listings in the United States
          </Link>
        </div>

        <div className="home-listings">
            <PremiumListings/>
        </div>

        <div className="home__listings">
          <Title level={4} className="home__listings-title">
            Listings of any kind
          </Title>
          <Row gutter={12}>
            <Col xs={24} sm={12}>
              <Link to="/listings/san%20fransisco">
                <div className="home__listings-img-cover">
                  <img
                    src={sanFransiscoImage}
                    alt="San Fransisco"
                    className="home__listings-img"
                  />
                </div>
              </Link>
            </Col>
            <Col xs={24} sm={12}>
              <Link to="/listings/cancún">
                <div className="home__listings-img-cover">
                  <img src={cancunImage} alt="Cancún" className="home__listings-img" />
                </div>
              </Link>
            </Col>
          </Row>
        </div>
    </Content>
  ) 
}