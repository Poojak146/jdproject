const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCjT0TRP0EJwXHc9hJSpbaPrIpa
xj/GGYpLDBbnZLkW7nyAvyIYeRGDAaI/v6VEbsZWuwS2R1k2WOzLJe+trRU/odWA
TPWxybVy2tHOnALk+7qx4sI38pACIekkeru/Fg9p0GbY6o6y1gNedEt/sbmwwxpD
UdR7bIXs1Jp8BTg58wIDAQAB
-----END PUBLIC KEY-----
`;
const crypto = require("crypto");

function UseCrypto(data) {
  let updatedData = data;

  if (typeof data !== "string") {
    updatedData = JSON.stringify(data);
  }
  const msg = crypto.publicEncrypt(
    { key: publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    Buffer.from(updatedData)
  );
  return msg.toString("base64");
}

export default UseCrypto;
