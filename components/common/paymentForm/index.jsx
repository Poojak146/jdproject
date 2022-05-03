const paymentForm = ({
  c_info = "",
  card_merchant_param = "",
  card_number = "",
  Category = "",
  consentFlow = true,
  cvv = "",
  expiry_month = "",
  expiry_year = "",
  fss_bank_code = "",
  IbiboCode = "",
  is_otp_pin = "",
  jd_token = "",
  jd_vertical_id = "",
  jdctoken = "",
  jdoid = "",
  module = "",
  name_on_card = "",
  nb_bank_name = "",
  one_click_checkout = true,
  pay = "",
  pay_opt = "",
  pg_page_name = "common_pg",
  pg_srv_prvdr = "",
  selPGMOpt = "",
  source = 2, // from url
  StoreCard = false,
  StoredCard = false,
  storedcardcount = 0,
  StoredCardToken = "",
  type = 1,
  upi_rembr_me_flag = false,
  upi_vpa = "",
  user_mobile_num = "",
  urlparams = "", // pass all the values from url
  version = "",
}) => ({
  c_info,
  card_merchant_param,
  card_number,
  Category,
  consentFlow,
  cvv,
  expiry_month,
  expiry_year,
  fss_bank_code,
  IbiboCode,
  is_otp_pin,
  jd_token,
  jd_vertical_id,
  jdctoken,
  jdoid,
  module,
  name_on_card,
  nb_bank_name,
  one_click_checkout,
  pay,
  pay_opt,
  pg_page_name,
  pg_srv_prvdr,
  selPGMOpt,
  source,
  StoreCard,
  StoredCard,
  storedcardcount,
  StoredCardToken,
  type,
  upi_rembr_me_flag,
  upi_vpa,
  user_mobile_num,
  urlparams,
  version,
});

export default paymentForm;