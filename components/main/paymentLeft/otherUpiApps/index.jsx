import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import paymentForm from "../../../common/paymentForm";
import paymentFormKeys from "../../../common/paymentForm/paymentFormKeys";
import { genericFetchData } from "../../../../app/genericFetchData";
import useSelectHook from "../../../common/useSelectHook";
// import UseCrypto from "../../../../app/UseCrypto";
import UseCrypto from "../../../../app/UseCrypto/rsaEncrypt";

const eligibilityInitialValue = {
  isEligible: true,
  notEligibleReason: "",
};

const OtherUpiApps = ({
  radioChecked,
  handleRadioButtonClick,
  transactionDetails,
  userCardStates: { card_count, user_upi = [] } = {},
}) => {
  const {
    reference_number: jdoid,
    sender_mobile: user_mobile_num,
    type_flag: jd_vertical_id,
  } = transactionDetails || {};
  const { query } = useRouter() || {};
  const { source = "", version = "" } = query || {};
  const [upiList, setUpiList] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [eligiblility, setEligiblility] = useState(eligibilityInitialValue);
  const { isEligible, notEligibleReason } = eligiblility;
  const formRef = useRef(null);
  const upiIdRef = useRef(null);
  const validateUpiId = async ({ upiId, onSubmitProps, body, values }) => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    };
    const [eligiblityResult, error] = await genericFetchData({
      url: `${process.env.NEXT_PUBLIC_UPI_VALIDATION_URL}`,
      method: "POST",
      headers,
      body: new URLSearchParams({
        type: 8,
        jdoid,
        upi_vpa: upiId,
        upi_rembr_me_flag: true,
        upi_type: "hdfc_upi",
        source: source,
        stored_upi: false,
      }),
      tokenId: jdoid,
    });
    if (error) return;
    const { msg, status } = eligiblityResult || {};
    const isSuccess = status === "SUCCESS";
    if (!disableButton && isSuccess) {
      const formikKeys = ["upiId"];
      const refFields = {
        upiIdRef,
      };
      formikKeys.forEach((name) => {
        const formikValue = values[name];
        refFields[`${name}Ref`].current.type = "password";
        onSubmitProps.setFieldValue(name, UseCrypto(formikValue));
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
      formRef.current.submit();
    } else {
      setEligiblility({
        isEligible: isSuccess,
        notEligibleReason: msg,
      });
      setDisableButton(false);
      onSubmitProps.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      upiId: "",
    },
    enableReinitialize: false,
    validateOnMount: true,
    validationSchema: Yup.object({
      upiId: Yup.string()
        .required("UPI ID Required")
        .test(
          "test-upiId", // this is used internally by yup
          "upi Id is invalid", //validation message
          (value = "") => {
            return (
              /[a-zA-Z0-9\.\-]{2,256}\@[a-zA-Z][a-zA-Z]{2,64}/g.test(value) ||
              formik.isSubmitting
            );
          }
        ),
    }),
    onSubmit: (values, onSubmitProps) => {
      const body = paymentForm({
        jdoid,
        urlparams: `id=${jdoid}&`,
        user_mobile_num,
        jd_vertical_id,

        source,
        version,

        pay_opt: "hdfc_upi",
        Category: "hdfc_upi",
        selPGMOpt: "UPI",

        upi_rembr_me_flag: true,
        upi_vpa: values.upiId,
        pg_srv_prvdr: "hdfc_upi",
      });

      setEligiblility(eligibilityInitialValue);
      setDisableButton(true);
      validateUpiId({
        upiId: values.upiId,
        onSubmitProps,
        body,
        values,
      });
    },
  });

  const { showSelectMenu, handleSelectBoxClick } = useSelectHook({
    formik,
    radioChecked,
  });

  const validateError = (name) =>
    (formik.errors[name] && formik.touched[name]) || !isEligible;
  const errorAndTouched = (name) => {
    const errorMsg = formik.errors[name];
    return (
      <>
        {validateError(name) && (
          <span className="err_txt">{notEligibleReason || errorMsg}</span>
        )}
      </>
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
    if (user_upi.length) setUpiList(user_upi);
  }, [user_upi]);

  const shouldButtonBeDisabled =
    !formik.isValid || !formik.dirty || formik.isSubmitting || disableButton;

  return (
    <form
      ref={formRef}
      action={process.env.NEXT_PUBLIC_PAYMENT_REDIRECT}
      method="POST"
      className="otherUpiAppsForm"
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
              Other UPI Apps
            </div>
            <div className="mt-30 dflex hl_pay_flexstart">
              <div
                className={`pr-10 ${validateError("upiId") ? "err_msg" : ""}`}
              >
                <div className="font12 color111 mb-8 hl_pay_label">
                  Please enter your UPI ID
                </div>
                <div className="font14 color111 mb-8 hl_pay_select_wrap">
                  <input
                    type="text"
                    name="upiId"
                    placeholder="Enter UPI ID"
                    className="hl_payment_inputbox hl_payment_inputbox2"
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
      </div>
    </form>
  );
};

export default OtherUpiApps;
