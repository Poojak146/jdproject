import CreditCardDetails from "../../../common/creditCardDetails";

const CreditDebitCards = ({
  radioChecked,
  handleRadioButtonClick,
  type,
  transactionDetails,
  userCardStates,
}) => {
  const creditOrDebit = type === "Debit" ? "DC" : "CC";
  const card_type = type === "Credit / Debit" ? "CCDC" : creditOrDebit;
  return (
    <div className={`dtbl p-15 ${radioChecked ? "activeoption" : ""}`}>
      <div className="dcell_top hl_payment_left_cell">
        <label className="hl_pay_radio_lbl">
          <input
            type="radio"
            checked={radioChecked}
            onChange={handleRadioButtonClick}
            name=""
          />
          <span className="hl_pay_radio">
            <span className="hl_pay_radioround" />
          </span>
        </label>
      </div>
      <div className="dcell">
        <div className="">
          <div
            className="font16 color111 fw600 mb-5 curs_pointer"
            onClick={handleRadioButtonClick}
          >
            {type} Cards
          </div>
          <div className="font12 color111 mb-15">
            {`We accept all major ${type} cards`}
          </div>
          <div className={`${radioChecked ? "dn" : ""}`}>
            <span
              className="font14 color007 fw600 curs_pointer"
              onClick={handleRadioButtonClick}
            >
              + Add new card
            </span>
          </div>
        </div>
        <div className={`emi_inrcontainer ${radioChecked ? "" : "dn"}`}>
          {radioChecked ? (
            <CreditCardDetails
              transactionDetails={transactionDetails}
              card_type={card_type}
              IbiboCode={card_type}
              userCardStates={userCardStates}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CreditDebitCards;
