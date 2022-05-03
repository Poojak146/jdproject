import { useRef, useState } from "react";
import { useRouter } from "next/router";
import paymentForm from "../../../common/paymentForm";
import paymentFormKeys from "../../../common/paymentForm/paymentFormKeys";
// import UseCrypto from "../../../../app/UseCrypto";
import UseCrypto from "../../../../app/UseCrypto/rsaEncrypt";

const CashOnDelivery = ({
  radioChecked,
  handleRadioButtonClick,
  transactionDetails,
}) => {
  const [disableButton, setDisableButton] = useState(false);
  const { query } = useRouter() || {};
  const { source = "", version = "" } = query || {};
  const formRef = useRef(null);

  const handleSubmit = () => {
    const {
      reference_number: jdoid,
      sender_mobile: user_mobile_num,
      type_flag: jd_vertical_id,
    } = transactionDetails || {};
    const body = paymentForm({
      jdoid,
      urlparams: `id=${jdoid}&`,
      user_mobile_num,
      jd_vertical_id,

      source,
      version,

      Category: "COD",
      selPGMOpt: "COD",
    });
    paymentFormKeys.forEach((item) => {
      const element = formRef.current.appendChild(
        document.createElement("input")
      );
      element.name = item;
      element.value = UseCrypto(body[item]);
      element.style.display = "none";
    });
    if (!disableButton) formRef.current.submit();
    setDisableButton(true);
  };

  return (
    <form
      ref={formRef}
      action={process.env.NEXT_PUBLIC_PAYMENT_REDIRECT}
      method="POST"
      autoComplete="off"
    >
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
              Cash on Delivery
            </div>
            <div className={`mt-20 ${radioChecked ? "" : "dn"}`}>
              <div>
                <button
                  className={`hl_paynow_btn ${
                    disableButton ? "disble_btn" : "curs_pointer"
                  }`}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CashOnDelivery;
