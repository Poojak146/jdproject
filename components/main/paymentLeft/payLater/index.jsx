import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import paymentForm from "../../../common/paymentForm";
import paymentFormKeys from "../../../common/paymentForm/paymentFormKeys";
import { genericFetchData } from "../../../../app/genericFetchData";
// import UseCrypto from "../../../../app/UseCrypto";
import UseCrypto from "../../../../app/UseCrypto/rsaEncrypt";

const bankNames = ["lazypay"];
const eligibilityInitialValue = {
  isEligible: false,
  notEligibleReason: "",
  loading: false,
};

const PayLater = ({
  radioChecked,
  handleRadioButtonClick,
  transactionDetails,
}) => {
  const { reference_number, sender_mobile, type_flag, amount, pg_env } =
    transactionDetails || {};
  const { query } = useRouter() || {};
  const { source = "", version = "", module = "" } = query || {};
  const [disableButton, setDisableButton] = useState(false);
  const [eligiblity, setEligiblity] = useState(eligibilityInitialValue);
  const { isEligible, notEligibleReason, loading } = eligiblity;
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
      const body = paymentForm({
        jdoid: reference_number,
        urlparams: `id=${reference_number}&`,
        user_mobile_num: sender_mobile,
        jd_vertical_id: type_flag,

        source,
        version,
        module,

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
      if (!disableButton && isEligible) formRef.current.submit();
      setDisableButton(true);
    },
  });

  const checkEligiblity = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    const [eligiblityResult, error] = await genericFetchData({
      url: `${process.env.NEXT_PUBLIC_PAYLATER_VALIDATION_URL}`,
      method: "POST",
      headers,
      body: new URLSearchParams({
        "data[mobile]": sender_mobile,
        "data[amount]": amount,
        "data[orderId]": reference_number,
        "data[type_flag]": type_flag,
        "data[pg_env]": pg_env,
      }),
      tokenId: reference_number,
    });
    const {
      code,
      customParams: { ["Vertical Name"]: vertical_name, Vertical_id } = {},
      eligibilityResponseId,
      emailRequired,
      message,
      reason,
      txnEligibility,
      userEligibility,
    } = eligiblityResult || {};

    setEligiblity({
      isEligible: txnEligibility,
      notEligibleReason: reason,
      loading: false,
    });
  };

  const bankSelection = (name) => () => {
    if (!loading) {
      formik.setFieldTouched("selectedOption");
      formik.setFieldValue("selectedOption", name);
      setEligiblity({
        ...eligibilityInitialValue,
        notEligibleReason: "loading...",
        loading: true,
      });
      checkEligiblity();
      handleRadioButtonClick();
    }
  };

  const validateError = (name) => {
    return formik.touched[name] && (formik.errors[name] || !isEligible);
  };

  const errorAndTouched = (name) => {
    const errorMessageInFormik = formik.errors[name];
    return (
      <>
        {validateError(name) && (
          <span className="err_txt">
            {notEligibleReason || errorMessageInFormik}
          </span>
        )}
      </>
    );
  };
  useEffect(() => {
    if (!radioChecked) {
      setEligiblity(eligibilityInitialValue);
      formik.resetForm();
      return;
    }
    const [firstBankName] = bankNames || [];
    bankSelection(firstBankName)();
  }, [radioChecked]);

  const shouldButtonBeDisabled =
    !formik.isValid ||
    !formik.dirty ||
    formik.isSubmitting ||
    disableButton ||
    !isEligible;
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
              Pay Later
            </div>
            <div className="mt-20">
              <div className="mb-30">
                {bankNames.map((name) => (
                  <div
                    key={name}
                    className={`hl_pay_select_brand ${
                      formik.values.selectedOption === name ? "active" : ""
                    }`}
                    onMouseDown={bankSelection(name)}
                  >
                    <span className="hl_pay_brand_img mb-5">
                      <Image
                        src="https://akam.cdn.jdmagicbox.com/images/icontent/payment_getway/lazy_pay2x.png"
                        alt="bank logo"
                        width={48}
                        height={48}
                      />
                    </span>
                    <div className="hl_pay_brandtext">{name}</div>
                  </div>
                ))}
                {errorAndTouched("selectedOption")}
              </div>
              <div className={`${radioChecked ? "" : "dn"}`}>
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
      </div>
    </form>
  );
};

export default PayLater;
