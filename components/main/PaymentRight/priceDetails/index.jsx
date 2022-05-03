const PriceDetails = ({ transactionDetails, itemCount = 0 }) => {
  const { amount, discount_amount, final_amount, payable_amount } =
    transactionDetails || {};

  return (
    <div className="hl_payment_right_white pt-20 pb-20 mb-20">
      <div className="font16 color111 fw600 pl-20 pr-20 pb-20">
        Price Details
      </div>
      <div className="hl_payment_divider mb-20" />
      <div className="pl-20 pr-20">
        <div className="dflex mb-20">
          <div className="font16 color111">
            Price {itemCount ? `(${itemCount} items)` : null}
          </div>
          <div className="font16 color111 fw600">₹ {amount}</div>
        </div>
        <div className="dflex mb-20">
          <div className="font16 color111">Discount</div>
          <div className="font16 color339">₹ {discount_amount}</div>
        </div>
        {/* <div className="dflex mb-20">
          <div className="font16 color111">Price (2 items)</div>
          <div className="font16 color339">₹ ___</div>
        </div> */}
        {/* <div className="dflex mb-20">
          <div className="font16 color111">Price (2 items)</div>
          <div className="font16 color111">₹ ___</div>
        </div> */}
        <div className="hl_payment_divider mb-15"></div>
        <div className="dflex mb-15">
          <div className="font20 color111 fw600">Total Amount</div>
          <div className="font20 color111 fw700">₹ {amount}</div>
        </div>
        {discount_amount ? (
          <div className="font14 color339">
            You will save ₹ {discount_amount} on this order
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PriceDetails;
