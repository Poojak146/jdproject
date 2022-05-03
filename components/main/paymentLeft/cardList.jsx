import Emi from "./emi";
import CashOnDelivery from "./cashOnDelivery";
import CreditDebitCards from "./creditDebitCards";
import Wallets from "./wallets";
import NetBanking from "./netBanking";
import OtherUpiApps from "./otherUpiApps";
import PayLater from "./payLater";

const pay_mode_opt = ({
  state,
  handleRadioButtonClick,
  setCardTypeFlag,
  transactionDetails,
  dropBothCards,
  userCardStates,
}) => [
  { key: "EC", component: null },
  { key: "OTP", component: null },
  {
    key: "customCards",
    component: dropBothCards ? null : (
      <CreditDebitCards
        handleRadioButtonClick={handleRadioButtonClick(
          "creditDebitRadioChecked"
        )}
        radioChecked={state.creditDebitRadioChecked}
        type={setCardTypeFlag}
        transactionDetails={transactionDetails}
        userCardStates={userCardStates}
      />
    ),
  },
  {
    key: "NB",
    component: (
      <NetBanking
        handleRadioButtonClick={handleRadioButtonClick(
          "netBankingRadioChecked"
        )}
        radioChecked={state.netBankingRadioChecked}
        transactionDetails={transactionDetails}
      />
    ),
  },
  {
    key: "EMI",
    component: (
      <Emi
        handleRadioButtonClick={handleRadioButtonClick("emiRadioChecked")}
        radioChecked={state.emiRadioChecked}
        transactionDetails={transactionDetails}
        userCardStates={userCardStates}
      />
    ),
  },
  {
    key: "WALLETS",
    component: (
      <Wallets
        handleRadioButtonClick={handleRadioButtonClick("walletsRadioChecked")}
        radioChecked={state.walletsRadioChecked}
        transactionDetails={transactionDetails}
        userCardStates={userCardStates}
      />
    ),
  },
  {
    key: "COD",
    component: (
      <CashOnDelivery
        handleRadioButtonClick={handleRadioButtonClick(
          "cashOnDeliveryRadioChecked"
        )}
        radioChecked={state.cashOnDeliveryRadioChecked}
        transactionDetails={transactionDetails}
      />
    ),
  },
  { key: "PP", component: null },
  { key: "CK", component: null },
  {
    key: "UPI",
    component: (
      <OtherUpiApps
        handleRadioButtonClick={handleRadioButtonClick("otherUpiRadioChecked")}
        radioChecked={state.otherUpiRadioChecked}
        transactionDetails={transactionDetails}
        userCardStates={userCardStates}
      />
    ),
  },
  { key: "OL", component: null },
  { key: "NEFT", component: null },
  { key: "OFLC", component: null },
  { key: "PAYU", component: null },
  { key: "BHIM", component: null },
  {
    key: "PAYLATER",
    component: (
      <PayLater
        handleRadioButtonClick={handleRadioButtonClick("payLaterRadioChecked")}
        radioChecked={state.payLaterRadioChecked}
        transactionDetails={transactionDetails}
      />
    ),
  },
  { key: "More", component: null },
  { key: "DC_EMI", component: null },
  { key: "UPI_SI_MANDATE", component: null },
];

export default pay_mode_opt;
