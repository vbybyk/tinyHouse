import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, Divider, Modal, Typography } from "antd";
import { KeyOutlined } from "@ant-design/icons";
import moment, { Moment } from "moment";
import { formatListingPrice } from "../../../../lib/utils";

interface Props {
  price: number;
  modalVisible: boolean;
  checkInDate: Moment;
  checkOutDate: Moment;
  setModalVisible: (modalVisible: boolean) => void;
}

const { Paragraph, Text, Title } = Typography;

export const ListingCreateBookingModal = ({
  price,
  modalVisible,
  checkInDate,
  checkOutDate,
  setModalVisible
}: Props) => {

  const elements = useElements();
  const stripe = useStripe();

  const handleCreateBooking = async () => { 
    if(!stripe) 
      { return; } 
    const cardElement = elements?.getElement("card");
    const { token: stripeToken } = await stripe!.createToken(cardElement!);
    console.log(stripeToken);
  }

  const daysBooked = checkOutDate.diff(checkInDate, "days") ;
  const listingPrice = price * daysBooked;

  return (
    <Modal
      visible={modalVisible}
      centered
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      <div className="listing-booking-modal">
        <div className="listing-booking-modal__intro">
          <Title className="listing-boooking-modal__intro-title">
            <KeyOutlined/>
          </Title>
          <Title level={3} className="listing-boooking-modal__intro-title">
            Book your trip
          </Title>
          <Paragraph>
            Enter your payment information to book the listing from the dates between{" "}
            <Text mark strong>
              {moment(checkInDate).format("MMMM Do YYYY")}
            </Text>{" "}
            and{" "}
            <Text mark strong>
              {moment(checkOutDate).format("MMMM Do YYYY")}
            </Text>
            
          </Paragraph>
        </div>

        <Divider />

        <div className="listing-booking-modal__charge-summary">
          <Paragraph>
            {formatListingPrice(price, false)} * {daysBooked} days ={" "}
            <Text strong>{formatListingPrice(listingPrice, false)}</Text>
          </Paragraph>
          <Paragraph className="listing-booking-modal__charge-summary-total">
            Total = <Text mark>{formatListingPrice(listingPrice, false)}</Text>
          </Paragraph>
        </div>

        <Divider />

        <div className="listing-booking-modal__stripe-card-section">
          <CardElement 
            options={{ hidePostalCode: true }}
            className="listing-booking-modal__stripe-card" />
          <Button 
            size="large" 
            type="primary" 
            className="listing-booking-modal__cta"
            onClick={handleCreateBooking}>
            Book
          </Button>
        </div>
      </div>
    </Modal>
  );
};