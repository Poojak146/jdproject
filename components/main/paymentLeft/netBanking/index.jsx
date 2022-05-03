import { useFormik } from "formik";
// import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { genericFetchData } from "../../../../app/genericFetchData";
import paymentForm from "../../../common/paymentForm";
import paymentFormKeys from "../../../common/paymentForm/paymentFormKeys";
import useSelectHook from "../../../common/useSelectHook";
// import UseCrypto from "../../../../app/UseCrypto";
import UseCrypto from "../../../../app/UseCrypto/rsaEncrypt";

const NetBanking = ({
  radioChecked,
  handleRadioButtonClick,
  transactionDetails,
}) => {
  const {
    reference_number: jdoid,
    sender_mobile: user_mobile_num,
    type_flag,
    // sel_pg_mode: pay_opt,
  } = transactionDetails || {};
  const { query } = useRouter() || {};
  const { source = "", version = "", module } = query || {};
  const formRef = useRef(null);
  const netBankingResponse = useRef({});
  const [netBankingDictionary, setNetBankingDictionary] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const {
    ["top6_bank_list"]: topBanks = [],
    ["bank_list"]: remainingBankList = [],
  } = netBankingDictionary || {};
  const intergratedBankList = [...topBanks, ...remainingBankList];
  const formik = useFormik({
    initialValues: {
      selectedOption: "",
    },
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: Yup.object({
      selectedOption: Yup.string().required("Bank Option Required"),
    }),
    onSubmit: async (values, onSubmitProps) => {
      const { code: selectedIbiboCode, nb_service_provider } =
        intergratedBankList.find(
          ({ name }) => name === values.selectedOption
        ) || {};
      const body = paymentForm({
        jdoid,
        urlparams: `id=${jdoid}&`,
        user_mobile_num,
        jd_vertical_id: type_flag,

        source,
        version,
        module,

        pay_opt: "payu",
        IbiboCode: selectedIbiboCode,
        Category: "netbanking",
        nb_bank_name: values.selectedOption,
        selPGMOpt: "NB",
        pg_srv_prvdr: nb_service_provider,
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
  const { showSelectMenu, handleSelectBoxClick } = useSelectHook({
    formik,
    radioChecked,
    handleRadioButtonClick,
  });

  const handleSelectBoxChange = (e) => {
    const { value } = e.target || {};
    formik.setFieldValue("selectedOption", value);
    const newStr = value.replace(/\\/g, "");
    const regex = new RegExp(newStr, "i");
    setNetBankingDictionary((c) => ({
      ...c,
      ["top6_bank_list"]: netBankingResponse.current?.[
        "top6_bank_list"
      ]?.filter(({ name } = {}) => regex.test(name)),
      ["bank_list"]: netBankingResponse.current?.["bank_list"]?.filter(
        ({ name } = {}) => regex.test(name)
      ),
    }));
  };

  const topBankSelection = (name) => () => {
    handleRadioButtonClick();
    formik.setFieldValue("selectedOption", name);
  };

  const validateError = (name) => formik.errors[name] && formik.touched[name];
  const errorAndTouched = (name) => {
    const errorMsg = formik.errors[name];
    return (
      <>{validateError(name) && <span className="err_txt">{errorMsg}</span>}</>
    );
  };

  const fetchNetBankingList = async () => {
    const [result, error] = await genericFetchData({
      url: process.env.NEXT_PUBLIC_NETBANKING_URL,
      tokenId: jdoid,
    });
    if (result) {
      setNetBankingDictionary(result);
      netBankingResponse.current = result;
    } else {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNetBankingList();
  }, []);

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
              Netbanking
            </div>
            <div className="mt-20">
              <div className="mb-15">
                {topBanks.map(({ id, name, logo }) => (
                  <div
                    key={id}
                    className={`hl_pay_select_brand curs_pointer ${
                      formik.values.selectedOption === name ? "active" : ""
                    }`}
                    onMouseDown={topBankSelection(name)}
                  >
                    <span className={`hl_pay_brand_img mb-5 ${logo}`}>
                      {/* <Image src={`/${logo}`} layout="fill" alt={logo} /> */}
                    </span>
                    <div className="hl_pay_brandtext">{name}</div>
                  </div>
                ))}
              </div>
              <div className="dflex hl_flexstart">
                <div
                  className={`pr-10 ${
                    validateError("selectedOption") ? "err_msg" : ""
                  }`}
                >
                  <div className="font14 color111 mb-8 hl_pay_select_wrap">
                    <input
                      type="text"
                      name="selectedOption"
                      className="hl_payment_selectbx"
                      placeholder="Select your bank"
                      {...formik.getFieldProps("selectedOption")}
                      onChange={handleSelectBoxChange}
                      onClick={handleSelectBoxClick}
                    />
                    <span
                      className="hl_pay_select_arw"
                      onClick={handleSelectBoxClick}
                    />
                    <div
                      className={`hl_pay_selectpop ${
                        showSelectMenu ? "" : "dn"
                      }`}
                    >
                      {remainingBankList.map((item) => (
                        <div
                          key={item.id}
                          onMouseDown={() =>
                            formik.setFieldValue("selectedOption", item.name)
                          }
                          className={`hl_payselectlbl ${
                            formik.values.selectedOption === item.name
                              ? "active"
                              : ""
                          }`}
                        >
                          <div className="hl_payselect_nm">{item.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {errorAndTouched("selectedOption")}
                </div>
                <div className="pr-10">
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
      </div>
    </form>
  );
};

export default NetBanking;
