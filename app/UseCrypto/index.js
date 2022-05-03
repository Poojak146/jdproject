import AES from "crypto-js/aes";
import Hex from "crypto-js/enc-hex";
import padZeroPadding from "crypto-js/pad-zeropadding";

function UseCrypto(data) {
  const key = Hex.parse(process.env.NEXT_PUBLIC_SECRET_KEY);
  const iv = Hex.parse(process.env.NEXT_PUBLIC_SECRET_IV);
  let updatedData = data;
  if (typeof data !== "string") {
    updatedData = JSON.stringify(data);
  }
  const ciphertext = AES.encrypt(updatedData, key, {
    iv: iv,
    padding: padZeroPadding,
  }).toString();
  return ciphertext;
}

export default UseCrypto;
