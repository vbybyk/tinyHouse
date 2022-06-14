import { Typography, Card, Divider, Button, DatePicker } from "antd";
import { displayErrorMessage, formatListingPrice } from "../../../../lib/utils";
import moment, { Moment } from "moment";

const { Paragraph, Title} = Typography;

interface Props {
  price: number,
  checkInDate: Moment | null,
  checkOutDate: Moment | null,
  setCheckInDate: (checkIndate : Moment | null) => void,
  setCheckOutDate: (checkOutdate : Moment | null) => void
};

export const ListingCreateBooking = ({price, checkInDate, checkOutDate, setCheckInDate, setCheckOutDate} : Props) => {

  const disabledDate = (currentDate? : Moment) => {
   if (currentDate) {
     const dateIsBeforeEndOfDay = currentDate.isBefore(moment().add(-1, 'days'))

     return dateIsBeforeEndOfDay
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
    }

    setCheckOutDate(selectedCheckOutDate);
  };

  const checkOutInputDisabled = !checkInDate;
  const buttonDisabled = !checkInDate || !checkOutDate;

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
          className="listing-booking__card-cta">
          Request to book!
        </Button>
      </Card>
    </div>
  )
}