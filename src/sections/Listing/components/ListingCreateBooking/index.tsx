import { Typography, Card, Divider, Button, DatePicker } from "antd";
import { displayErrorMessage, formatListingPrice } from "../../../../lib/utils";
import { Viewer } from "../../../../lib/types";
import { Listing } from "../../../../lib/graphql/queries/Listing/__generated__/Listing";
import { BookingsIndex } from "./types";
import moment, { Moment } from "moment";

const { Paragraph, Title, Text } = Typography;

interface Props {
  viewer: Viewer,
  host: Listing["listing"]["host"],
  price: number,
  bookingsIndex: Listing["listing"]["bookingsIndex"],
  checkInDate: Moment | null,
  checkOutDate: Moment | null,
  setCheckInDate: (checkIndate : Moment | null) => void,
  setCheckOutDate: (checkOutdate : Moment | null) => void,
  setModalVisible: (modalVisible: boolean) => void
};

export const ListingCreateBooking = ({viewer, host, price, bookingsIndex, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate, setModalVisible} : Props) => {

  const bookingsIndexJSON: BookingsIndex = JSON.parse(bookingsIndex);

  const dateIsBooked = (currentDate: Moment) => {
    const year = moment(currentDate).year();
    const month = moment(currentDate).month();
    const day = moment(currentDate).date();

    if (bookingsIndexJSON[year] && bookingsIndexJSON[year][month]) {
      return Boolean(bookingsIndexJSON[year][month][day]);
    } else {
      return false;
    }
  };

  const disabledDate = (currentDate? : Moment) => {
   if (currentDate) {
     const dateIsBeforeEndOfDay = currentDate.isBefore(moment().add(-1, 'days'))

     return dateIsBeforeEndOfDay || dateIsBooked(currentDate);
    } else {
      return false;
    }
};

  const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
      if (checkInDate && selectedCheckOutDate) {
        if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
          return displayErrorMessage(
            `You can't book date of check out to be prior to check in!`
          );
        }
        let dateCursor = checkInDate;

        while (moment(dateCursor).isBefore(selectedCheckOutDate, "days")) {
          dateCursor = moment(dateCursor).add(1, "days");

          const year = moment(dateCursor).year();
          const month = moment(dateCursor).month();
          const day = moment(dateCursor).date();

          if (
            bookingsIndexJSON[year] &&
            bookingsIndexJSON[year][month] &&
            bookingsIndexJSON[year][month][day]
          ) {
            return displayErrorMessage(
              "You can't book a period of time that overlaps existing bookings. Please try again!"
            );
          }
        }
      }

      setCheckOutDate(selectedCheckOutDate);
    };

  const viewerIsHost = viewer.id === host.id;
  const checkInInputDisabled = !viewer.id || viewerIsHost || !host.hasWallet;
  const checkOutInputDisabled = checkInInputDisabled || !checkInDate;
  const buttonDisabled = checkInInputDisabled || !checkInDate || !checkOutDate;

  let buttonMessage = "You won't be charged yet";
  if (!viewer.id) {
    buttonMessage = "You have to be signed in to book a listing!";
  } else if (viewerIsHost) {
    buttonMessage = "You can't book your own listing!";
  } else if (!host.hasWallet) {
    buttonMessage =
      "The host has disconnected from Stripe and thus won't be able to receive payments.";
  }

  return(
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <div>
          <Paragraph>
            <Title level={2} className="listing-booking__card-title">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
          </Paragraph>
          <Divider />
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check In</Paragraph>
            <DatePicker 
              value={checkInDate}
              format={"DD/MM/YYYY"}
              disabledDate={disabledDate}
              showToday={false}
              onChange={dateValue => setCheckInDate(dateValue)}
              onOpenChange={() => setCheckOutDate(null)}/>
          </div>
          <div className="listing-booking__card-date-picker">
            <Paragraph strong>Check Out</Paragraph>
            <DatePicker 
              value={checkOutDate}
              format={"DD/MM/YYYY"}
              disabledDate={disabledDate}
              showToday={false}
              disabled={checkOutInputDisabled}
              onChange={dateValue => verifyAndSetCheckOutDate(dateValue)}/>
          </div>
        </div>
        <Divider />
        <Button 
          size="large" 
          type="primary" 
          disabled={buttonDisabled}
          onClick={() => setModalVisible(true)}
          className="listing-booking__card-cta">
          Request to book!
        </Button>
        <Text type="secondary" mark>
          {buttonMessage}
        </Text>
      </Card>
    </div>
  )
}