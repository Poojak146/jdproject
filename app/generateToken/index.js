const jwt = require("jsonwebtoken");

const createSecretKey = () => {
  const data = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET;
  const buff = Buffer.from(data, "base64");
  return buff;
};

const generateAccessToken = (id) => {
  const currentTimestamp = Math.round(Date.now() / 1000) - 10;
  const expire = currentTimestamp + 70;
  const JWTSECRET = createSecretKey();
  const transactionDetails = {
    iat: currentTimestamp,
    jti: require("crypto").randomBytes(64).toString("hex"),
    iss: "https://securepg.justdial.com/",
    nbf: currentTimestamp,
    exp: expire,
    data: [id],
  };
  return jwt.sign(transactionDetails, JWTSECRET, {
    algorithm: "HS512",
  });
};

export default function generateToken(id) {
  const token = generateAccessToken(id);
  return token;
}
