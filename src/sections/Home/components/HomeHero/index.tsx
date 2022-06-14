import { Link } from "react-router-dom";
import { Typography, Input, Card, Col, Row} from "antd";

import torontoImage from '../../assets/toronto.jpg';
import losAngelesImage from '../../assets/los-angeles.jpg';
import dubaiImage from '../../assets/dubai.jpg';
import londonImage from '../../assets/london.jpg';

const { Search } = Input;
const { Title } = Typography;

interface Props {
  onSearch: (value: string) => void;
}

export const HomeHero = ({onSearch} : Props) => {
  return(
    <div className="home-hero">
      <div className="home-hero__search">
        <Title 
          level={3} 
          className="home-hero__title">Find a great place for staying</Title>
        <Search 
          placeholder="Los Angeles"
          enterButton
          size="large"
          onSearch={onSearch}
          className="home-hero__search-input"/>
      </div>
        <Row gutter={12} className="home-hero__cards">
          <Col md={6}>
            <Link to={"/listings/toronto"}>
              <Card cover={<img src={torontoImage} alt="Toronto" />}>Toronto</Card>
            </Link>
          </Col>
          <Col md={6}>
            <Link to={"/listings/dubai"}>
              <Card cover={<img src={dubaiImage} alt="Dubai" />}>Dubai</Card>
            </Link>
          </Col>
          <Col md={6}>
            <Link to={"/listings/los%20angeles"}>
              <Card cover={<img src={losAngelesImage} alt="Los Angeles" />}>Los Angeles</Card>
            </Link>
          </Col>
          <Col md={6}>
            <Link to={"/listings/london"}>
              <Card cover={<img src={londonImage} alt="London" />}>London</Card>
            </Link>
          </Col>
        </Row>
      </div>
  )
}