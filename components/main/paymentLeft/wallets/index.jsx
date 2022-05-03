import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import paymentFormKeys from "../../../common/paymentForm/paymentFormKeys";
import paymentForm from "../../../common/paymentForm";
import walletBanks from "./walletBanks";
// import UseCrypto from "../../../../app/UseCrypto";
import UseCrypto from "../../../../app/UseCrypto/rsaEncrypt";

const Wallets = ({
  radioChecked,
  handleRadioButtonClick,
  transactionDetails,
  userCardStates: { card_count, user_upi = [] },
}) => {
  const { query } = useRouter() || {};
  const { source = "", version = "" } = query || {};
  const [disableButton, setDisableButton] = useState(false);
  const formRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      selectedOption: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: Yup.object({
      selectedOption: Yup.string().required("Bank Option Required"),
    }),
    onSubmit: (values, onSubmitProps) => {
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
        storedcardcount: card_count,

        pay_opt: values.selectedOption,
        Category: values.selectedOption,
        selPGMOpt: "WALLET",
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
    },
  });

  const topBankSelection = (name) => () => {
    handleRadioButtonClick();
    formik.setFieldValue("selectedOption", name);
  };

  useEffect(() => {
    if (!radioChecked) {
      formik.resetForm();
    }
  }, [radioChecked]);
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
              Wallets
            </div>
            <div className="mt-20">
              <div className="mb-30">
                {walletBanks.map(({ name, displayName, cssClass, w_m_img }) => (
                  <div
                    key={name}
                    className={`hl_pay_select_brand curs_pointer ${
                      formik.values.selectedOption === name ? "active" : ""
                    }`}
                    onMouseDown={topBankSelection(name)}
                  >
                    <span className={`hl_pay_brand_img mb-5 ${cssClass}`}>
                      <Image
                        src={w_m_img}
                        alt="bank logo"
                        width={48}
                        height={48}
                      />
                    </span>
                    <div className="hl_pay_brandtext">{displayName}</div>
                  </div>
                ))}
              </div>
              <div className={`${radioChecked ? "" : "dn"}`}>
                <button
                  className={`hl_paynow_btn ${
                    !formik.isValid ||
                    !formik.dirty ||
                    formik.isSubmitting ||
                    disableButton
                      ? "disble_btn"
                      : "curs_pointer"
                  }`}
                  type="submit"
                  onClick={formik.handleSubmit}
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

export default Wallets;
