import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer2 from "../headerFooterNavigation/footer2";
import Header from "../headerFooterNavigation/header1";
import PaymentLeft from "./paymentLeft";
import PaymentRight from "./PaymentRight";
import { genericFetchData } from "../../app/genericFetchData";

const Main = ({ transactionDetails, idFromServer }) => {
  const { query } = useRouter() || {};
  const {
    source = "",
    version = "",
    id: idByGet = "",
    module = "",
  } = query || {};
  const [updatedTransactionDetails, setUpdatedTransactionDetails] = useState(
    {}
  );

  const postPutRedirection = async () => {
    const body = new FormData();
    const oid = idByGet || idFromServer;
    body?.append("oid", oid);
    body?.append("source", source);
    body?.append(
      "merchantRequestID",
      Buffer.from(oid, "utf8").toString("base64")
    );
    body?.append("module", module);
    body?.append("version", version);
    const [result, error] = await genericFetchData({
      url: process.env.NEXT_PUBLIC_PUT_REDIRECTION_MASTER,
      method: "POST",
      body,
      tokenId: idFromServer,
    });
    const {
      amount,
      auto_payment_id,
      bk_url,
      droppayopt,
      is_auto_bill_payment,
      senderMobile,
    } = result || {};
    const isAmountChanged = +amount !== transactionDetails?.amount;
    if (isAmountChanged)
      setUpdatedTransactionDetails((s) => ({ ...s, amount }));
  };

  useEffect(() => {
    setUpdatedTransactionDetails(transactionDetails);
  }, [transactionDetails]);

  useEffect(() => {
    postPutRedirection();
  }, []);
  return (
    <>
      <div>
        <Header />
        <div className="hl_content_section mt-10">
          <div className="hl_container">
            <div className="hl_payment_wrapper dflex">
              <PaymentLeft
                transactionDetails={updatedTransactionDetails}
                idFromServer={idFromServer}
              />
              <PaymentRight transactionDetails={updatedTransactionDetails} />
            </div>
          </div>
        </div>
        <Footer2 />
      </div>
      <style global jsx>{`
        /*container css*/
        .hl_container {
          max-width: 1580px;
          width: 100%;
          margin: 0 auto;
        }
        .hl_payment_wrapper {
          align-items: flex-start;
          padding: 0 10px;
        }
        .hl_payment_divider {
          height: 1px;
          background-color: #f2f2f2;
          display: inline-block;
          width: 100%;
        }

        @media all and (min-width: 768px) and (max-width: 1024px) {
        }
      `}</style>
    </>
  );
};

export default Main;
