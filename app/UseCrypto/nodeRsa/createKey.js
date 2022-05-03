import RSA from "node-rsa";

const createKeyPair = () => {
  const key = new RSA().generateKeyPair();
  const publicKey = key.exportKey("public");
  const privateKey = key.exportKey("private");
  console.log({ publicKey, privateKey });
};

export default createKeyPair;
