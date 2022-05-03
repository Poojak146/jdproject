import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import cardValidator from "@juspay/simple-card-validator";
import paymentForm from "../../common/paymentForm";
import paymentFormKeys from "../paymentForm/paymentFormKeys";
import { monthArrayParent, yearsArrayParent } from "./yearAndMonthArray";
import useAwayClick from "../useAwayClick";
import CardNumberInput from "./cardNumberInput";
// import UseCrypto from "../../../app/UseCrypto";
import UseCrypto from "../../../app/UseCrypto/rsaEncrypt";

const initialState = {
  showYearSelectMenu: false,
  showMonthSelectMenu: false,
  disableButton: false,
  yearsArray: yearsArrayParent,
  monthArray: monthArrayParent,
};
const creditDebitValidationInitialState = false;
const addCurrentMonthWithZero = (month) => {
  const monthNumbered = +month;
  if (monthNumbered >= 10) return month;
  return "0" + month;
};
const checkDateValidity = (selectedMonth, testContext) => {
  const currentYear = "" + new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1);
  const expiry_year = "" + testContext.parent.expiry_year;
  const expiry_month = "" + selectedMonth;
  const currentDateStringAdded =
    currentYear + addCurrentMonthWithZero(currentMonth);
  const expiryDateStringAdded = expiry_year + expiry_month;
  const currentDateSum = +currentDateStringAdded;
  const expiryDateSum = +expiryDateStringAdded;
  const isDateValid = expiryDateSum >= currentDateSum;
  return isDateValid;
};
const CreditCardDetails = ({
  labelName,
  transactionDetails,
  IbiboCode,
  card_type,
  userCardStates: { card_count, user_upi = [] },
  isEmi,
}) => {
  const { query } = useRouter() || {};
  const { source = "", version = "" } = query || {};
  const formRef = useRef(null);

  const cvvRef = useRef(null);
  const card_numberRef = useRef(null);
  const nameRef = useRef(null);
  const expiry_monthRef = useRef(null);
  const expiry_yearRef = useRef(null);

  const [state, setstate] = useState(initialState);
  const [StoreCard, setStoreCard] = useState(false);
  const [debitCreditValidationError, setDebitCreditValidationError] = useState(
    creditDebitValidationInitialState
  );
  const {
    showYearSelectMenu,
    showMonthSelectMenu,
    yearsArray,
    monthArray,
    disableButton,
  } = state || {};
  const setCategory = () => {
    if (isEmi) return "emi";
    if (card_type === "CCDC") return "creditcard";
    if (card_type === "CC") return "creditcard";
    if (card_type === "DC") return "debitcard";
  };
  const setSelPGMOpt = () => {
    // const debitOrEmiOpt = card_type === "DC" ? "DC" : "EMI";
    // const creditOrOthersOpt = card_type === "CC" ? "CC" : debitOrEmiOpt;
    // return card_type === "CCDC" ? "CCDC" : creditOrOthersOpt;
    return "CCDC";
  };

  const formik = useFormik({
    initialValues: {
      cvv: "",
      card_number: "",
      name: "",
      expiry_month: "",
      expiry_year: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: Yup.object({
      cvv: Yup.string()
        .required("CVV required")
        .test(
          "test-cvvNumber", // this is used internally by yup
          "CVV  number is invalid", //validation message
          (value) =>
            new cardValidator(
              formik.values.card_number.replaceAll(" ", "") || "0"
            ).validateCvv(value || "0")
        ), // return true false based on validation
      card_number: Yup.string()
        .required("Card number required")
        .test(
          "test-cardTyper", // this is used internally by yup
          `Please use ${card_type === "DC" ? "Debit" : "Credit"} card`, //validation message
          (value = "") => !debitCreditValidationError
        )
        .test(
          "test-cardNumber", // this is used internally by yup
          "Card number is invalid", //validation message
          (value = "") =>
            new cardValidator(value.replaceAll(" ", "") || "0").getCardDetails()
              .valid
        ),
      name: Yup.string().required("Name on card Required"),
      expiry_month: Yup.string()
        .required("Month Required")
        .test("month expiry", "Expired Date", (selectedMonth, testContext) => {
          const isDateValid = checkDateValidity(selectedMonth, testContext);
          const condition = !testContext.parent.expiry_year || isDateValid;
          return condition;
        }),
      expiry_year: Yup.string()
        .required("Year Required")
        .test(
          "len",
          "Must be a valid year please select from dropdown menu",
          (val) => val?.length === 4
        ),
    }),
    onSubmit: async (values, onSubmitProps) => {
      const {
        reference_number: jdoid,
        sender_mobile: user_mobile_num,
        type_flag: jd_vertical_id,
        // sel_pg_mode: pay_opt,
      } = transactionDetails || {};

      const body = paymentForm({
        jdoid,
        urlparams: `id=${jdoid}&`,
        user_mobile_num,
        jd_vertical_id,

        source,
        version,
        StoreCard,
        storedcardcount: card_count,
        pay_opt: "payu",
        IbiboCode,
        Category: setCategory(),
        selPGMOpt: setSelPGMOpt(),
      });
      const formikKeys = [
        "cvv",
        "card_number",
        "expiry_month",
        "expiry_year",
        "name",
      ];
      const refFields = {
        cvvRef,
        card_numberRef,
        expiry_monthRef,
        expiry_yearRef,
        nameRef,
      };
      formikKeys.forEach((name) => {
        let formikValue = values[name];
        if (name === "card_number") {
          formikValue = formikValue.replaceAll(" ", "");
        }
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
          element.value = UseCrypto("" + body[item]);
          element.style.display = "none";
        });
      if (!disableButton) formRef.current.submit();
      setstate((s) => ({ ...s, disableButton: true }));
    },
  });
  const handleInputSelect = (e) => {
    const { id } = e.target || {};
    if (e.key === "Tab") return;
    setstate((s) => ({ ...s, [id]: true }));
  };

  const handleYearInputChange = (e) => {
    const { value } = e.target || {};
    const updatedValue = value.replace(/[^0-9]/g, "").replace(/\W/gi, "");
    formik.setFieldValue("expiry_year", updatedValue);
    const regex = new RegExp(updatedValue, "i");
    setstate((s) => ({
      ...s,
      yearsArray: yearsArrayParent.filter((each) => regex.test(each)),
    }));
  };

  const escFunction = (event) => {
    if (event.keyCode === 27 && (showYearSelectMenu || showMonthSelectMenu)) {
      setstate(initialState);
    }
  };

  const mouseDownFunction = (e) => {
    const isScrollClick =
      e.offsetX > e.target.clientWidth || e.offsetY > e.target.clientHeight;
    if ((showYearSelectMenu || showMonthSelectMenu) && !isScrollClick) {
      setstate(initialState);
    }
  };

  const handleCardCvvInput = (e) => {
    const { value } = e.target || {};
    const cardDetails =
      new cardValidator(
        formik.values.card_number.replaceAll(" ", "") || "0"
      ).getCardDetails() || {};
    const { cvv_length } = cardDetails || {};
    let maxCvvLength = Math.max(...cvv_length);
    if (maxCvvLength === -Infinity) {
      maxCvvLength = 3;
    }
    const isNotNumber = /\D+/g.test(value);
    if (value?.length <= maxCvvLength && !isNotNumber) formik.handleChange(e);
  };

  const validateError = (name) => {
    if (name === "card_number") {
      return (
        (formik.errors[name] && formik.touched[name]) ||
        debitCreditValidationError
      );
    }
    return formik.errors[name] && formik.touched[name];
  };
  const errorAndTouched = (name) => {
    const errorMsg = formik.errors[name];
    return (
      <>{validateError(name) && <span className="err_txt">{errorMsg}</span>}</>
    );
  };

  const handleSaveCard = () => {
    setStoreCard((s) => !s);
  };

  useAwayClick({ state, escFunction, mouseDownFunction });
  return (
    <form
      ref={formRef}
      action={process.env.NEXT_PUBLIC_PAYMENT_REDIRECT}
      method="POST"
      className="creditDebitCardForm"
      autoComplete="off"
    >
      {labelName ? (
        <div className="font14 color111 fw600 mb-20"> {labelName}</div>
      ) : null}
      <div className="cardnamenumber_wrp ">
        <div className="dtbl">
          <CardNumberInput
            validateError={validateError}
            formik={formik}
            errorAndTouched={errorAndTouched}
            setDebitCreditValidationError={setDebitCreditValidationError}
            transactionDetails={transactionDetails}
            card_type={card_type}
            creditDebitValidationInitialState={
              creditDebitValidationInitialState
            }
            card_numberRef={card_numberRef}
          />
          <div
            className={`dcell dcell_top pl-5 ${
              validateError("name") ? "err_msg" : ""
            }`}
          >
            <div className="font12 color111 fw400"> Name on card </div>
            <div className="cardinptBx mt-7">
              <input
                className="inrinput"
                type="text"
                placeholder="Enter card name"
                name="name"
                ref={nameRef}
                {...formik.getFieldProps("name")}
              />{" "}
            </div>
            {errorAndTouched("name")}
          </div>
        </div>
        <div className="dtbl mt-18">
          <div className="dcell dcell_top pr-5">
            <div className="font12 color111 fw400"> Card Expiry Date </div>
            <div className="dtbl">
              <div
                className={`dcell dcell_top pr-5 ${
                  validateError("expiry_month") ? "err_msg" : ""
                }`}
              >
                <div className="cardinptBx mt-7">
                  <input
                    className="inrinput"
                    type="text"
                    placeholder="Month"
                    id="showMonthSelectMenu"
                    name="expiry_month"
                    ref={expiry_monthRef}
                    {...formik.getFieldProps("expiry_month")}
                    onChange={handleInputSelect}
                    onClick={handleInputSelect}
                    onKeyDown={handleInputSelect}
                  />{" "}
                  <span
                    className="dropdownicn curs_pointer"
                    id="showMonthSelectMenu"
                    onClick={handleInputSelect}
                  >
                    {" "}
                  </span>
                  <div
                    className={`hl_pay_selectpop ${
                      showMonthSelectMenu ? "" : "dn"
                    }`}
                  >
                    {monthArray.map(({ key, value }) => (
                      <div
                        key={key}
                        // name='expiry_month'
                        onMouseDown={() =>
                          formik.setFieldValue("expiry_month", value)
                        }
                        className={`hl_payselectlbl ${
                          formik.values.expiry_month === value ? "active" : ""
                        }`}
                      >
                        <div className="hl_payselect_nm">{key}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {errorAndTouched("expiry_month")}
              </div>
              <div
                className={`dcell dcell_top pl-5 ${
                  validateError("expiry_year") ? "err_msg" : ""
                }`}
              >
                <div className="cardinptBx mt-7">
                  <input
                    className="inrinput"
                    type="text"
                    placeholder="Year"
                    id="showYearSelectMenu"
                    name="expiry_year"
                    ref={expiry_yearRef}
                    {...formik.getFieldProps("expiry_year")}
                    onChange={handleYearInputChange}
                    onClick={handleInputSelect}
                    onKeyDown={handleInputSelect}
                  />{" "}
                  <span
                    className="dropdownicn curs_pointer"
                    id="showYearSelectMenu"
                    onClick={handleInputSelect}
                  >
                    {" "}
                  </span>
                  <div
                    className={`hl_pay_selectpop ${
                      showYearSelectMenu ? "" : "dn"
                    }`}
                  >
                    {yearsArray.map((item) => (
                      <div
                        key={item}
                        // name='expiry_year'
                        onMouseDown={() =>
                          formik.setFieldValue("expiry_year", item)
                        }
                        className={`hl_payselectlbl ${
                          formik.values.expiry_year === item ? "active" : ""
                        }`}
                      >
                        <div className="hl_payselect_nm">{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {errorAndTouched("expiry_year")}
              </div>
            </div>
          </div>
          <div
            className={`dcell dcell_top pl-5 ${
              validateError("cvv") ? "err_msg" : ""
            }`}
          >
            <div className="font12 color111 fw400"> CVV </div>
            <div className="dtbl">
              <div className="dcell pr-5">
                <div className="cardinptBx mt-7">
                  <input
                    className="inrinput"
                    type="password"
                    placeholder="Enter CVV"
                    name="cvv"
                    ref={cvvRef}
                    {...formik.getFieldProps("cvv")}
                    onChange={handleCardCvvInput}
                  />{" "}
                  <span className="cvvicn"> </span>{" "}
                </div>
                {errorAndTouched("cvv")}
              </div>
              <div className="dcell dcell_top pl-5 tright">
                <button
                  className={`paynowBtn mt-7 font 16 colorfff fw600 ${
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
      <div className="sv_card_paywrp">
        <div className="dcell_top addonbx">
          <label className="hl_pay_chk_lbl">
            <input
              type="checkbox"
              name=""
              checked={StoreCard}
              onChange={handleSaveCard}
            />
            <span className="hl_pay_checkbox" />
          </label>
        </div>
        <div className="dcell_top contbx">
          <div className="font11 color111 fw400">
            {" "}
            Save this card for future payments.{" "}
          </div>
          <div className="font10 color777 fw400 mt-3">
            {" "}
            Please note card details will be securely saved for future order.
            CVV will not be saved. <span className="color007">
              more info
            </span>{" "}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreditCardDetails;
