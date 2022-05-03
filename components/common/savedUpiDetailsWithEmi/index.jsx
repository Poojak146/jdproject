import { useEffect, useRef, useState } from "react";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import cardValidator from "@juspay/simple-card-validator";
import paymentFormKeys from "../../common/paymentForm/paymentFormKeys";
import paymentForm from "../../common/paymentForm";
// import paymentOptionArray from "./paymentOptionArray";
import useSelectHook from "../useSelectHook";
// import UseCrypto from "../../../app/UseCrypto";
import UseCrypto from "../../../app/UseCrypto/rsaEncrypt";
// import logoArray from "./logoArray";

const SavedUpiDetailsWithEmi = ({
  radioChecked = false,
  handleRadioButtonClick,
  transactionDetails,
  cardValues,
  userCardStates: { card_count, user_upi = [] },
  paymentOptionArray = [],
}) => {
  const { query } = useRouter() || {};
  const { source = "", version = "", module = "" } = query || {};
  const {
    card_no_new,
    bank_name,
    card_brand,
    card_no,
    expiry_month,
    expiry_year,
    card_merchant_param,
    jdctoken,
    card_mode,
    card_bin,
    is_emi,
    name_on_card,
    card_token,
    jd_token,
    // bank_code,
  } = cardValues || {};
  const isEmi = paymentOptionArray.length && is_emi === "Y";
  // const isEmi = false;
  const formRef = useRef(null);
  const cvvRef = useRef(null);
  const [disableButton, setDisableButton] = useState(false);
  const [bankLogo, setBankLogo] = useState("");
  const formik = useFormik({
    initialValues: {
      cvv: "",
      selectedOption: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: Yup.object({
      cvv: Yup.string()
        .required("CVV is required")
        .test(
          "test-cvvNumber", // this is used internally by yup
          "CVV  number is invalid", //validation message
          (value) =>
            new cardValidator(card_bin.replaceAll(" ", "") || "0").validateCvv(
              value || "0"
            )
        ),
      selectedOption: isEmi
        ? Yup.string().required("Payment Option Required")
        : undefined,
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
        module,

        card_merchant_param,
        jdctoken,
        StoredCard: true,
        storedcardcount: card_count,
        StoredCardToken: card_token,
        selPGMOpt: card_mode,
        name_on_card,

        jd_token,

        // cvv: values.cvv,
        card_number: card_no,
        expiry_month,
        expiry_year,

        pay_opt: "payu",
        Category: "expresscheckout",
        IbiboCode: values["selectedOption"],
        selPGMOpt: "CCDC",
      });
      const formikKeys = ["cvv"];
      const refFields = {
        cvvRef,
      };
      formikKeys.forEach((name) => {
        const formikValue = values[name];
        refFields[`${name}Ref`].current.type = "password";
        formik.setFieldValue(name, UseCrypto(formikValue));
      });
      paymentFormKeys
        .filter((key) => !formikKeys.includes(key))
        .forEach((item) => {
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

  useEffect(() => {
    if (isEmi && radioChecked) {
      const [{ ibibocode }] = paymentOptionArray || [];
      formik.setFieldValue("selectedOption", ibibocode);
    }
  }, [isEmi, radioChecked]);

  useEffect(() => {
    if (paymentOptionArray.length) {
      const [{ bank_logo = "" }] = paymentOptionArray || [];

      setBankLogo(bank_logo);
    }
  }, [paymentOptionArray.length]);

  const { showSelectMenu, handleSelectBoxClick } = useSelectHook({
    formik,
    radioChecked,
  });

  const validateError = (name) => formik.errors[name] && formik.touched[name];
  const errorAndTouched = (name) => {
    const errorMsg = formik.errors[name];
    return (
      <>{validateError(name) && <span className="err_txt">{errorMsg}</span>}</>
    );
  };

  const handleCardCvvInput = (e) => {
    const { value } = e.target || {};
    const cardDetails =
      new cardValidator(card_bin.replaceAll(" ", "") || "0").getCardDetails() ||
      {};
    const { cvv_length } = cardDetails || {};
    const maxCvvLength = Math.max(...cvv_length);
    const isNotNumber = /\D+/g.test(value);
    if (value?.length <= maxCvvLength && !isNotNumber) formik.handleChange(e);
  };

  return (
    <form
      ref={formRef}
      action={process.env.NEXT_PUBLIC_PAYMENT_REDIRECT}
      method="POST"
      className="axisUpiEmiForm"
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
          <div className="dflex">
            <div
              className="font16 color111 fw600 curs_pointer"
              onClick={handleRadioButtonClick}
            >
              {`${bank_name} ${card_brand} Card`}{" "}
              <span className="font14 color111">{card_no_new}</span>{" "}
              <span className="ml-15 vm">
                <img
                  src={bankLogo || "/v1/favicon.ico"}
                  className="hl_banklogo_sml"
                  width={24}
                  height={24}
                />
              </span>
            </div>
            <div className="font14 color777">{`Expires on ${expiry_month}/${expiry_year}`}</div>
          </div>
          <div className="mt-30 dflex hl_pay_flexstart">
            {isEmi ? (
              <div className="pr-10">
                <div className="font14 color111 fw600 mb-8 hl_pay_label">
                  Select options
                </div>
                <div className="font14 color111 mb-8 hl_pay_select_wrap">
                  <input
                    type="text"
                    name=""
                    className="hl_payment_selectbx"
                    readOnly=""
                    value={paymentOptionArray.reduce((acc, item) => {
                      if (formik.values.selectedOption === item.ibibocode)
                        return `${item.tenure} ₹ ${item.amount}`;
                      return acc;
                    }, "")}
                    onChange={handleSelectBoxClick}
                    onClick={handleSelectBoxClick}
                    onKeyDown={handleSelectBoxClick}
                  />
                  <span
                    onClick={handleSelectBoxClick}
                    className="hl_pay_select_arw"
                  />
                  <div
                    className={`hl_pay_selectpop ${showSelectMenu ? "" : "dn"}`}
                  >
                    {paymentOptionArray.map((item) => (
                      <div
                        key={item.ibibocode}
                        onMouseDown={() =>
                          formik.setFieldValue("selectedOption", item.ibibocode)
                        }
                        className={`hl_payselectlbl ${
                          formik.values.selectedOption === item.ibibocode
                            ? "active"
                            : ""
                        }`}
                      >
                        <div className="hl_payselect_nm">
                          {item.tenure} &#8377; {item.amount}
                        </div>
                        <div className="font11 color777">
                          @ {item.emiBankInterest}% p.a.
                          {item.transactionAmount ? (
                            <span className="pl-5 pr-5">|</span>
                          ) : (
                            ""
                          )}
                          Total ₹ {item.transactionAmount}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="font12 color111">EMI option available</div>
              </div>
            ) : null}
            <div className={`pr-10 ${validateError("cvv") ? "err_msg" : ""}`}>
              <div className="font12 color111 mb-8 hl_pay_label">CVV</div>
              <div className="font14 color111 mb-8 hl_pay_input_wrap">
                <input
                  id="cvv"
                  type="password"
                  placeholder="Enter CVV"
                  className="hl_payment_inputbox"
                  name="cvv"
                  ref={cvvRef}
                  {...formik.getFieldProps("cvv")}
                  onChange={handleCardCvvInput}
                />{" "}
                <span className="hl_payment_helpicon" />
              </div>
              {errorAndTouched("cvv")}
            </div>
            <div className="pr-10">
              <div className="hl_pay_label mb-8">&nbsp;</div>
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
    </form>
  );
};

export default SavedUpiDetailsWithEmi;
