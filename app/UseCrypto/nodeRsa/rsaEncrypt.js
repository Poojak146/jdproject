import publicKey from "./publicKey";
import RSA from "node-rsa";

const UseRsaEncrypt = (data) => {
  const publicKeyLocal = new RSA();
  publicKeyLocal.importKey(publicKey);
  const encrypted = publicKeyLocal.encrypt(data, "base64");
  return encrypted;
};

export default UseRsaEncrypt;
