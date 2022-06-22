import { Avatar, Card, Divider, Typography, Button } from "antd";
import {User as UserData} from '../../../../lib/graphql/queries/User/__generated__/User'
import { Viewer } from "../../../../lib/types";

interface Props {
  user: UserData["user"]  //Look-up types (or otherwise labeled as indexed access types) appear 
                            //very similar to how elements can be accessed in an object.
  viewer: Viewer
}

const {Paragraph, Text, Title} = Typography;

const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_S_CLIENT_ID}&scope=read_write`;

export const UserProfile = ({user, viewer} : Props) => {

  const redirectToStripe = () => {
    window.location.href = stripeAuthUrl;
  };

  const userIdMatch = user.id === viewer.id;
  const additionalProfileElement = userIdMatch? (
    <> 
      <Divider />
      <div className="user-profile__details">
        <Title level={4}>Additional Details</Title>
        <Paragraph>
          Interested in becoming a TinyHouse host? Register with your Stripe account!
        </Paragraph>
        <Button 
          type="primary" 
          className="user-profile__details-cta"
          onClick={redirectToStripe}>
          Connect with Stripe
        </Button>
        <Paragraph type="secondary">
          TinyHouse uses{" "}
          <a
            href="https://stripe.com/en-US/connect"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stripe
          </a>{" "}
          to help transfer your earnings in a secure and truster manner.
        </Paragraph>
      </div>
    </>
  ) : null

  return(
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="user-profile__avatar">
          <Avatar size={100} src={user.avatar} />
        </div>
        <Divider />
        <div className="user-profile__details">
          <Title level={4}>Details</Title>
          <Paragraph>
            Name: <Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Contact: <Text strong>{user.contact}</Text>
          </Paragraph>
        </div>
        {additionalProfileElement}
      </Card>
    </div>
  )
}