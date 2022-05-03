/* eslint-disable jsx-a11y/alt-text */

import { useEffect, useState } from "react";
import { genericFetchData } from "../../../../app/genericFetchData";
import CreditCardDetails from "../../../common/creditCardDetails";
import EmiOptionsCreditCards from "./emiOptionsCreditCards";
import SelectEmiOptions from "./selectEmiOptions";

/* eslint-disable @next/next/no-img-element */
const Emi = ({
  radioChecked,
  handleRadioButtonClick,
  transactionDetails,
  userCardStates,
}) => {
  const [emiBankCards, setEmiBankCards] = useState([]);

  const [isInputSelectClicked, setIsInputSelectClicked] = useState(false);
  const [isEmiPlanSelected, setIsEmiPlanSelected] = useState(false);
  const [emiPlanOptions, setEmiPlanOptions] = useState({});
  const [selectedEmiPlan, setSelectedEmiPlan] = useState({});
  const [selectedBankName, setSelectedBankName] = useState("selected banks");

  useEffect(() => {
    if (!radioChecked) {
      setIsInputSelectClicked(false);
      setSelectedEmiPlan({});
      setIsEmiPlanSelected(false);
      setSelectedBankName("selected banks");
    }
  }, [radioChecked]);

  const handleChangePlan = () => {
    setSelectedEmiPlan({});
    setIsEmiPlanSelected(false);
  };

  const handleEmiPlanSelection = (emiPlan) => {
    setSelectedEmiPlan(emiPlan);
    setIsEmiPlanSelected(true);
  };

  const handleCardSelection = ({ emiPlans, bankName }) => {
    setEmiPlanOptions(emiPlans);
    setSelectedBankName(bankName);
  };

  const fetchEmiList = async () => {
    const { type_flag, amount, reference_number } = transactionDetails || {};

    const [result, error] = await genericFetchData({
      url: `${process.env.NEXT_PUBLIC_EMI_URL}&var1=${amount}&type_flag=${type_flag}`,
      tokenId: reference_number,
    });
    if (result && result instanceof Object) {
      setEmiBankCards(
        Object.entries(result).map(([key, value]) => {
          const [{ bank_logo }] = Object.values(value).map((item) => item);
          return {
            name: key,
            imgUrl: bank_logo,
            emiPlans: value,
          };
        })
      );
    } else {
      console.log(error);
    }
  };
  useEffect(() => {
    if (Object.keys(transactionDetails).length !== 0) fetchEmiList();
  }, [transactionDetails]);
  return (
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
            EMI
          </div>
          <div className="font12 color339">
            Get debit or credit EMI on {selectedBankName}{" "}
          </div>
          <div
            className={`dflex hl_flexstart mt-20 ${
              isInputSelectClicked ? "dn" : ""
            }`}
          >
            <div className="pr-10">
              <div className="font14 color111 mb-8 hl_pay_select_wrap">
                <input
                  type="text"
                  name=""
                  className="hl_payment_selectbx"
                  placeholder="Select your bank"
                  readOnly=""
                  onClick={(e) => {
                    setIsInputSelectClicked(true);
                    handleRadioButtonClick(e);
                  }}
                />
                <span
                  className="hl_pay_select_arw curs_pointer"
                  onClick={handleRadioButtonClick}
                />
              </div>
            </div>
          </div>
          <div className={`emi_inrcontainer ${isEmiPlanSelected ? "" : "dn"}`}>
            <div className="changeplanbx dtbl">
              <div className="dcell imgbxwrp">
                <div className="imgbx">
                  {" "}
                  <img src={selectedEmiPlan.bank_logo} />
                </div>
              </div>
              <div className="dcell pl-12 font16 color111 fw600">
                {" "}
                {selectedBankName}{" "}
                <span className="fw400">
                  {" "}
                  &#8377; {selectedEmiPlan.emiAmount} for{" "}
                  {selectedEmiPlan.tenure}
                </span>{" "}
              </div>
              <div className="dcell changplantd">
                <button
                  className="changeplanbtn color007 font12 fw700 curs_pointer"
                  onClick={handleChangePlan}
                >
                  {" "}
                  Change Plan
                </button>
              </div>
            </div>
            {isEmiPlanSelected ? (
              <CreditCardDetails
                labelName={`Add ${selectedBankName} Details`}
                transactionDetails={transactionDetails}
                IbiboCode={selectedEmiPlan.ibibocode}
                card_type={
                  selectedEmiPlan.card_type === "credit card" ? "CC" : "DC"
                }
                isEmi
                userCardStates={userCardStates}
              />
            ) : null}
          </div>
          <div
            className={`emi_option_wrp dflex hl_flexstart hl_flexstretch mt-25 ${
              isInputSelectClicked && !isEmiPlanSelected ? "" : "dn"
            }`}
          >
            <EmiOptionsCreditCards
              emiBankCards={emiBankCards}
              handleCardSelection={handleCardSelection}
            />
            <SelectEmiOptions
              emiPlanOptions={emiPlanOptions}
              handleEmiPlanSelection={handleEmiPlanSelection}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emi;
