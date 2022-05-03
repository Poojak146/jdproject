import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";
import paymentForm from "../paymentForm";
import paymentFormKeys from "../paymentForm/paymentFormKeys";
import useSelectHook from "../useSelectHook";
// import UseCrypto from "../../../app/UseCrypto";
import UseCrypto from "../../../app/UseCrypto/rsaEncrypt";

function SavedUpiDetails({
  transactionDetails,
  radioChecked = false,
  handleRadioButtonClick,
  cardValues,
  userCardStates: { card_count, user_upi = [] },
  discount,
}) {
  const { query } = useRouter() || {};
  const { source = "", version = "" } = query || {};
  const {
    card_no_new,
    bank_name,
    card_brand,
    expiry_month,
    expiry_year,
    card_merchant_param,
    jdctoken,
    card_mode,
  } = cardValues || {};
  const [upiList, setUpiList] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const formRef = useRef(null);
  const upiIdRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      upiId: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: Yup.object({
      upiId: Yup.string()
        .required("UPI ID Required")
        .test(
          "test-upiId", // this is used internally by yup
          "upi Id is invalid", //validation message
          (value = "") =>
            /[a-zA-Z0-9\.\-]{2,256}\@[a-zA-Z][a-zA-Z]{2,64}/g.test(value)
        ),
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

        card_merchant_param,
        jdctoken,
        StoredCard: true,
        storedcardcount: card_count,
        StoredCardToken: jdctoken,
        IbiboCode: card_mode,
        selPGMOpt: card_mode,

        pay_opt: values.upiId,
        Category: "UPI",
        selPGMOpt: "UPI",
      });
      const formikKeys = ["upiId"];
      const refFields = {
        upiIdRef,
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

  const handleSelectBoxChange = (e) => {
    const { value } = e.target || {};
    formik.setFieldValue("upiId", value);
    const newStr = value.replace(/\\/g, "");
    const regex = new RegExp(newStr, "i");
    setUpiList(user_upi.filter(({ vpa }) => regex.test(vpa)));
  };

  useEffect(() => {
    setUpiList(user_upi);
  }, [user_upi]);

  const shouldButtonBeDisabled =
    !formik.isValid || !formik.dirty || formik.isSubmitting || disableButton;

  return (
    <form
      ref={formRef}
      action={process.env.NEXT_PUBLIC_PAYMENT_REDIRECT}
      method="POST"
      className="savedUpiDetailsForm"
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
              <img
                src="http://akam.cdn.jdmagicbox.com/images/icontent/newwap/newprot_w/axisbankbnr.webp"
                className="hl_banklogo_sml"
              />
            </div>
            <div className="font14 color777">{`Expires on ${expiry_month}/${expiry_year}`}</div>
          </div>
          {discount ? (
            <div className="font12 color339">
              5% Unlimited discount <span className="color0F7">T&C</span>
            </div>
          ) : null}
          <div className="mt-30 dflex hl_pay_flexstart">
            <div className={`pr-10 ${validateError("upiId") ? "err_msg" : ""}`}>
              <div className="font12 color111 mb-8 hl_pay_label">
                Please select your UPI ID
              </div>
              <div className="font14 color111 mb-8 hl_pay_select_wrap">
                <input
                  type="text"
                  name="upiId"
                  className="hl_payment_inputbox hl_payment_inputbox2"
                  placeholder="Enter UPI ID"
                  ref={upiIdRef}
                  {...formik.getFieldProps("upiId")}
                  onChange={handleSelectBoxChange}
                  onClick={handleSelectBoxClick}
                />
                <div
                  className={`hl_pay_selectpop ${showSelectMenu ? "" : "dn"}`}
                >
                  {upiList.map((item) => (
                    <div
                      key={item.vpa}
                      onMouseDown={() =>
                        formik.setFieldValue("upiId", item.vpa)
                      }
                      className={`hl_payselectlbl ${
                        formik.values.upiId === item.vpa ? "active" : ""
                      }`}
                    >
                      <div className="hl_payselect_nm">{item.vpa}</div>
                    </div>
                  ))}
                </div>
              </div>
              {errorAndTouched("upiId")}
            </div>
            <div className="pr-10">
              <div className="hl_pay_label mb-8">&nbsp;</div>
              <button
                className={`hl_paynow_btn ${
                  shouldButtonBeDisabled ? "disble_btn" : "curs_pointer"
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
}

export default SavedUpiDetails;
