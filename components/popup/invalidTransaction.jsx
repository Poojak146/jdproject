import Header from "../headerFooterNavigation/header1";
import FooterPayment from "../headerFooterNavigation/footer_payment";

function InvalidTransaction({ handleRetry }) {
  return (
    <>
      <div>
        <Header />
        <section className="hl_content_section">
          <div className="hl_container">
            <div className="hl_content_wrapper">
              <div className="container_inrwrp paymentpgwrp mt-8">
                <div className="inrwrpbx2">
                  <div className="mt-80 pl-25 pr-25 tcenter">
                    <div className="mt-5 ">
                      {" "}
                      <i className="timeout-icn"> </i>{" "}
                    </div>
                    <div className="font20 colorec4 fw500 mt-18">
                      {" "}
                      Invalid Transaction Details
                    </div>
                    {/* <div className="font15 color111 fw400 mt-16 lh-22">
                      {" "}
                      You are not completed the payment on time. Please Try
                      again to make payment{" "}
                    </div> */}
                    <div className="tryBtnwrp dflexvcenter mt-30 mb-30">
                      <button
                        className="font16 colorfff fw400"
                        onClick={handleRetry}
                      >
                        {" "}
                        Retry{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <FooterPayment />
      </div>
      <style global jsx>{`
        /*container css*/
        .hl_container {
          max-width: 1580px;
          width: 100%;
          margin: 0 auto;
        }
        /* Payment Failed  Page */
        .container_inrwrp {
          background: #fff;
          display: table;
          width: 100%;
          table-layout: fixed;
        }
        .paymentpgwrp {
          min-height: calc(100vh - 170px);
        }
        .paymentpgwrp .inrwrpbx2 {
          width: 530px;
          margin: 0 auto;
        }
        .mt-8 {
          margin-top: 8px;
        }
        .mt-12 {
          margin-top: 12px;
        }
        .mt-16 {
          margin-top: 16px;
        }
        .mt-18 {
          margin-top: 18px;
        }
        .mt-80 {
          margin-top: 80px;
        }
        .dflexvcenter {
          display: flex;
          width: 100%;
          align-items: center;
        }
        .timeout-icn {
          background: url(https://akam.cdn.jdmagicbox.com/images/icontent/hyperlocal/hl_paymenttimeout.svg)
            no-repeat;
          width: 64px;
          height: 64px;
          display: inline-block;
          background-size: 64px;
        }
        .lh-22 {
          line-height: 22px;
        }
        .paymentpgwrp .tryBtnwrp {
          justify-content: center;
        }
        .paymentpgwrp .tryBtnwrp button {
          width: 200px;
          background: #0076d7;
          border: 0;
          color: #fff;
          border-radius: 6px;
          height: 50px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-pack: center;
          -webkit-justify-content: center;
          -ms-flex-pack: center;
          justify-content: center;
          -webkit-align-items: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
        }
        /* Payment Failed  Page */
      `}</style>
    </>
  );
}

export default InvalidTransaction;
