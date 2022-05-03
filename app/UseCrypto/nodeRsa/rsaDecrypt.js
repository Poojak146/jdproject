import RSA from "node-rsa";
import privateKey from "./privateKey";

const UseRsaDecrypt = (data) => {
  const privateKeyLocal = new RSA();
  privateKeyLocal.importKey(privateKey);
  const decrypted = privateKeyLocal.decrypt(data, "utf8");
  return decrypted;
};

export default UseRsaDecrypt;
