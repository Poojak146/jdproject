import { useEffect, useState } from "react";

const SelectEmiOptions = ({ emiPlanOptions, handleEmiPlanSelection }) => {
  const [selectedOption, setSelectedOption] = useState("");
  useEffect(() => {
    const [firstOptionKey] = Object.keys(emiPlanOptions);
    setSelectedOption(firstOptionKey);
  }, [emiPlanOptions]);
  const handleRadioClick = (optionKey) => () => {
    setSelectedOption(optionKey);
  };
  const handleButtonClick = (value) => () => {
    handleEmiPlanSelection(value);
  };
  return (
    <div className="emi_option_right">
      <div className="selectemiplan_wrp">
        <div className="font14 color111 fw600"> Select EMI Plan </div>
        <div className="font12 color777 fw400 mt-5">
          {" "}
          All Product will have this interest rate in this plan{" "}
        </div>
        <div className="ulwrp">
          {Object.entries(emiPlanOptions).map(([key, value]) => (
            <div
              key={key}
              className={`liwrp ${selectedOption === key ? "active" : ""}`}
            >
              <label className="labelbx dtbl curs_pointer">
                <div className="dtbl">
                  <div className="dcell_top hyp_radiobx">
                    <input
                      type="radio"
                      name="radio"
                      // defaultChecked="checked"
                      checked={selectedOption === key}
                      onChange={handleRadioClick(key)}
                    />
                    <span className=" hyp_radiockbx" />
                  </div>
                  <div className="dcell_top pl-10 font14 color111 fw600">
                    {" "}
                    &#8377; {value.emiAmount} for {value.tenure}{" "}
                  </div>
                  <div className="dcell_top tright font11 color777 fw400">
                    {" "}
                    at {value.emiBankInterest}% p.a.{" "}
                  </div>
                </div>
              </label>
              <div className="hideshow_contbx dtbl ">
                <div className="dtbl pl-10 pr-10">
                  {" "}
                  <span className="dcell_top hyp_radiobx"></span>
                  <div className="dcell_top pl-10 font12 color111 fw400">
                    <div className="dtbl ">EMI Value</div>
                    <div className="dtbl mt-3">&#8377;{value["emi_value"]}</div>
                  </div>
                  <div className="dcell_top pl-10 font12 color111 fw400 tcenter">
                    <div className="dtbl ">Total interest</div>
                    <div className="dtbl mt-3">
                      &#8377;{value["emi_interest_paid"]}
                    </div>
                  </div>
                  <div className="dcell_top pl-10 font12 color111 fw400 tright">
                    <div className="dtbl fw600">Total Amount</div>
                    <div className="dtbl mt-3">
                      &#8377;{value.loanAmount + value["emi_interest_paid"]}
                    </div>
                  </div>
                </div>
                <div className="devidercont mt-15 mb-10"> </div>
                <div className="dtbl pl-10 pr-10 tright">
                  <button
                    className="selPlanBtn font12 colorfff fw700"
                    onClick={handleButtonClick(value)}
                  >
                    {" "}
                    Select this plan{" "}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectEmiOptions;
