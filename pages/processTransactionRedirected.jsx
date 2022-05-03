import FormData from "form-data";
import { useState } from "react";
import { useRouter } from "next/router";
import { genericFetchData } from "../app/genericFetchData";
import Main from "../components/main";
import PaymentTimeout from "../components/popup/paymenttimeout";
import Paymentduplicateattempt from "../components/popup/paymentduplicateattempt";
import InvalidTransaction from "../components/popup/invalidTransaction";

import bodyParser from "body-parser";
import { promisify } from "util";

function PaymentOption({ transactionDetails, id }) {
  const router = useRouter();
  const [resetTimeout, setResetTimeout] = useState(false);
  const { create_time, success_flag } = transactionDetails || {};

  const handleRetry = () => {
    router.back();
    setResetTimeout(true);
  };

  const timeOut = () => {
    const updatedTimeInMilli = Date.parse(create_time);
    const currentTimeInMilli = Date.now();
    const differenceInMilli = currentTimeInMilli - updatedTimeInMilli;
    const hourDifferece = differenceInMilli / (1000 * 60 * 60);
    return hourDifferece > 2;
  };

  switch (true) {
    case timeOut() && !resetTimeout: {
      return <PaymentTimeout handleRetry={handleRetry} />;
    }
    case Object.keys(transactionDetails).length === 0 && !resetTimeout: {
      return <InvalidTransaction handleRetry={handleRetry} />;
    }
    case success_flag === 1 && !resetTimeout: {
      return <Paymentduplicateattempt handleRetry={handleRetry} />;
    }
    default:
      return <Main transactionDetails={transactionDetails} idFromServer={id} />;
  }
}

export default PaymentOption;

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
const getBody = promisify(bodyParser.urlencoded({ extended: true }));

export const getServerSideProps = async (ctx) => {
  const { query, req, res } = ctx || {};
  const { id: idByGet = "" } = query || {};
  let idByPost = "";
  if (req.method === "POST") {
    await getBody(req, res);
    const { id = "" } = req.body || {};
    idByPost = id;
  }
  const id = idByGet || idByPost;

  const body = new FormData();
  body?.append("id", id);
  const urlOrder = `${process.env.DOMAIN_DEV}${process.env.NEXT_PUBLIC_TRANSACTION_URL}`;
  const [orderInfoResult, orderInfoError] = await genericFetchData({
    url: urlOrder,
    method: "POST",
    // headers,
    body,
    tokenId: id,
  });
  if (orderInfoError) console.error({ error2: orderInfoError });
  const { result: { [id]: transactionDetails = {} } = {} } =
    orderInfoResult || {};
  return {
    props: {
      transactionDetails: transactionDetails,
      id,
    },
  };
};
