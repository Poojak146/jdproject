/* eslint-disable jsx-a11y/alt-text */

import AvailableOffers from "./availableOffers";
import PriceDetails from "./priceDetails";
import PaymentRightStyling from "./styling";

/* eslint-disable @next/next/no-img-element */
function PaymentRight({ transactionDetails, offers = [] }) {
  return (
    <div className="hl_payment_right">
      <PaymentRightStyling />
      {offers.length ? <AvailableOffers /> : null}
      <PriceDetails transactionDetails={transactionDetails} />
      <div className="hl_payment_right_white pt-25 pb-25 mb-20 tcenter">
        <img src="https://akam.cdn.jdmagicbox.com/images/icontent/newwap/hyperlocal/hl_payment_secure_img.svg" />
      </div>
    </div>
  );
}

export default PaymentRight;
