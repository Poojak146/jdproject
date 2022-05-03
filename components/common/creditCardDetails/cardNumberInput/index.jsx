import cardValidator from "@juspay/simple-card-validator";
import { useState } from "react";
import { genericFetchData } from "../../../../app/genericFetchData";
import usePrevious from "../../../../app/usePrevious";

const CardNumberInput = ({
  validateError,
  formik,
  errorAndTouched,
  setDebitCreditValidationError,
  transactionDetails,
  card_type,
  creditDebitValidationInitialState,
  card_numberRef,
}) => {
  const initialCardType = "";
  const [cardType, setCardType] = useState(initialCardType);
  const configureCardType = (result) => {
    const { data: { bins_data: { card_type } = {} } = {} } = result || {};
    setCardType(card_type);
  };
  const validateCardSelection = (result) => {
    const { data: { bins_data: { category } = {} } = {} } = result || {};
    const shouldValidateCreditOrDebit =
      card_type === "DC" || card_type === "CC";
    if (!shouldValidateCreditOrDebit) return;
    const isDifferentCard =
      (category === "creditcard" && card_type === "DC") ||
      (category === "debitcard" && card_type === "CC");
    if (!isDifferentCard) return;
    setDebitCreditValidationError(true);
  };

  const callCreditDebitVaidationUrl = async (value) => {
    const { amount, reference_number } = transactionDetails || {};

    const [result, error] = await genericFetchData({
      url: `${process.env.NEXT_PUBLIC_CC_DC_VALIDATION_URL}&var1=${amount}&var2=${value}`,
      tokenId: reference_number,
    });
    if (error) return;
    configureCardType(result);
    validateCardSelection(result);
  };

  const creditDebitCardValidation = (value) => {
    const reachedCreditDebitValidationLength = value.length === 6;
    const reachedCreditDebitValidationResetLength = value.length === 5;
    if (reachedCreditDebitValidationLength) {
      callCreditDebitVaidationUrl(value);
    }
    if (reachedCreditDebitValidationResetLength) {
      setDebitCreditValidationError(creditDebitValidationInitialState);
      setCardType(initialCardType);
    }
  };

  const previousCardNumber = usePrevious(formik.values.card_number);

  const updatingCardValue = (noSpaceString, e) => {
    const { target: { value } = {} } = e || {};
    const cardDetails =
      new cardValidator(noSpaceString || "0").getCardDetails() || {};
    const { max_length, gaps = [], card_type: cardType } = cardDetails || {};
    const totalPossibleStringLength = max_length + gaps.length || 6;
    const stringLengthCondition = value?.length <= totalPossibleStringLength;
    const firstGapCondition = noSpaceString.length < 6;
    const firstGap = 4;
    const secondGapCondition = noSpaceString.length < 11;
    const secondGap = gaps[1] - gaps[0] || 4;
    const thirdGapCondition = gaps[2];
    const thirdGap = thirdGapCondition ? gaps[2] - gaps[1] : 5;
    const isDeleted = value.length < previousCardNumber.length;
    const gapToUse = firstGapCondition
      ? firstGap
      : secondGapCondition
      ? secondGap
      : thirdGap;
    let regex = new RegExp(`(.{${gapToUse}})`, "g");
    let updatedValue = "";
    if (isDeleted) {
      updatedValue = value.trim();
    } else if (cardType === "amex" && noSpaceString.length === 15) {
      regex = new RegExp(
        `\\b(\\d{${firstGap}})(\\d{${secondGap}})(\\d{${thirdGap}})\\b`,
        "g"
      );
      updatedValue = value
        .replace(/[^0-9]/g, "")
        .replace(/\W/gi, "")
        .replace(regex, "$1 $2 $3");
    } else {
      updatedValue = value
        .replace(/[^0-9]/g, "")
        .replace(/\W/gi, "")
        .replace(regex, "$1 ");
    }

    const hasExceededMaxLength =
      updatedValue.length > totalPossibleStringLength;
    if (hasExceededMaxLength) {
      updatedValue = updatedValue.trim();
    }
    if (stringLengthCondition)
      formik.setFieldValue("card_number", updatedValue);
  };

  const handleCardNumberInput = (e) => {
    const { value } = e.target || {};
    const noSpaceString = value.replaceAll(" ", "");
    creditDebitCardValidation(noSpaceString);
    updatingCardValue(noSpaceString, e);
  };

  return (
    <div
      className={`dcell dcell_top pr-5 ${
        validateError("card_number") ? "err_msg" : ""
      }`}
    >
      <div className="font12 color111 fw400">
        {" "}
        Card Number{cardType && `(${cardType})`}{" "}
      </div>
      <div className="cardinptBx mt-7">
        <input
          className="inrinput"
          type="tel"
          placeholder="Enter card number"
          name="card_number"
          ref={card_numberRef}
          autoFocus
          {...formik.getFieldProps("card_number")}
          onChange={handleCardNumberInput}
        />
      </div>
      {errorAndTouched("card_number")}
    </div>
  );
};

export default CardNumberInput;
