import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
// import AddGiftPromoCode from "./AddGiftPromoCode"
import JdCash from "./jdCash";
import PaymentLeftStyling from "./styling";
import pay_mode_opt from "./cardList";
import SavedUpiDetailsWithEmi from "../../common/savedUpiDetailsWithEmi";
import { genericFetchData } from "../../../app/genericFetchData";

const initialState = {
  axisCreditRadioChecked: false,
  creditDebitRadioChecked: false,
  otherUpiRadioChecked: false,
  netBankingRadioChecked: false,
  walletsRadioChecked: false,
  emiRadioChecked: false,
  payLaterRadioChecked: false,
  cashOnDeliveryRadioChecked: false,
};

function PaymentLeft({ transactionDetails, idFromServer }) {
  const {
    jd_cash_flag,
    droppayopt,
    type_flag = "",
    pg_env: env = "",
    sub_type_flag = "",
    sender_mobile,
    amount,
    reference_number,
  } = transactionDetails || {};
  const [state, setstate] = useState(initialState);
  const [paymentOptionsObj, setPaymentOptionsObj] = useState({});
  const [userCardStates, setuserCardStates] = useState({
    user_cards: {},
    card_count: 0,
    user_upi: [],
    is_auto_bill_payment: false,
  });
  const { query } = useRouter() || {};
  const { source = "", version = "", id: idByGet = "" } = query || {};
  const droppayoptArray = droppayopt?.split(",") || [];
  const handleRadioButtonClick = (name) => () => {
    setstate((s) => ({
      ...Object.keys(s).reduce((acc, item) => {
        const updateAcc = {
          ...acc,
          [item]: false,
        };
        return updateAcc;
      }, {}),
      [name]: true,
    }));
  };
  const dropCardsLength = droppayoptArray.reduce((acc, item) => {
    if (item === "CC" || item === "DC") {
      acc.push(item);
    }
    return acc;
  }, []).length;
  const dropBothCards = dropCardsLength === 2;
  const includeBothCards = dropCardsLength === 0;
  const dropCredit = droppayoptArray.includes("CC");
  const setCardTypeFlag = includeBothCards
    ? "Credit / Debit"
    : dropCredit
    ? "Debit"
    : "Credit";

  const formFormData = () => {
    const jdoid = idByGet || idFromServer;
    const body = new FormData();
    body?.append("type", 1);
    body?.append("jdoid", jdoid);
    body?.append("user_num", sender_mobile);
    body?.append("env", env);
    body?.append("OTPDisplayFlag", true);
    body?.append("vertical_id", type_flag);
    body?.append("sub_vertical_id", sub_type_flag);
    body?.append("merchantRequestID", btoa(jdoid));
    body?.append("source", source);
    return body;
  };

  const postExpressCard = async () => {
    const body = formFormData();
    const [result, error] = await genericFetchData({
      url: process.env.NEXT_PUBLIC_EXPRESS_CARD,
      method: "POST",
      body,
      tokenId: idFromServer,
    });
    if (!error) {
      const { stored_card: { trans_details } = {} } = result || {};
      setuserCardStates(trans_details);
    }
  };

  const fetchEmiList = async () => {
    const [result, error] = await genericFetchData({
      url: `${process.env.NEXT_PUBLIC_EMI_URL_EXPRESS}&var1=${amount}&type_flag=${type_flag}`,
      tokenId: reference_number,
    });
    if (result && result instanceof Object) {
      setPaymentOptionsObj(result);
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Object.keys(transactionDetails).length !== 0) {
      postExpressCard();
      fetchEmiList();
    }
  }, [transactionDetails]);

  return (
    <div className="hl_payment_left">
      <PaymentLeftStyling />

      <div className="hl_payment_left_white pt-15 mb-15">
        {jd_cash_flag ? <JdCash /> : null}
        {droppayoptArray?.includes("EC") ? null : (
          <div className="pl-20 pr-20 mb-15">
            <div className=" hl_paymentOption_box">
              {userCardStates?.user_cards &&
                Object.entries(userCardStates?.user_cards)?.map(
                  ([key, values]) => (
                    <Fragment key={key}>
                      <SavedUpiDetailsWithEmi
                        handleRadioButtonClick={handleRadioButtonClick(key)}
                        radioChecked={state[key]}
                        transactionDetails={transactionDetails}
                        cardValues={values}
                        userCardStates={userCardStates}
                        paymentOptionArray={Object.entries(
                          paymentOptionsObj
                        ).reduce((acc, [key1, value1]) => {
                          if (key1 !== values.bank_code) return acc;
                          return Object.values(value1);
                        }, [])}
                      />
                      <div className="hl_payment_divider" />
                    </Fragment>
                  )
                )}
            </div>
          </div>
        )}
        <div className="pl-20 pr-20 mb-15">
          <div className=" hl_paymentOption_box">
            {pay_mode_opt({
              state,
              handleRadioButtonClick,
              setCardTypeFlag,
              transactionDetails,
              dropBothCards,
              userCardStates,
            })
              .filter(
                ({ key, component }) =>
                  !droppayoptArray?.includes(key) && component
              )
              .map(({ key, component }) => (
                <Fragment key={key}>
                  {component}
                  <div className="hl_payment_divider" />
                </Fragment>
              ))}
            {/* <AddGiftPromoCode /> */}
            {/* <div className="hl_payment_divider" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentLeft;
