import generateToken from "./generateToken";

const genericFetchData = async ({
  url,
  method = "GET",
  body,
  headers = {},
  noJson,
  useText,
  tokenId,
}) => {
  try {
    let updatedHeaders = headers;

    // jwt part starts
    if (tokenId) {
      const token = generateToken(tokenId);
      updatedHeaders = { ...headers, "X-Authorization": `Bearer ${token}` };
    }
    // jwt part ends

    const response = await fetch(url, {
      method,
      body,
      headers: updatedHeaders,
    });
    const shouldNotUseJson = noJson || !response || useText;
    const responseJson = shouldNotUseJson
      ? useText
        ? await response.text()
        : response
      : await response.json();
    return [responseJson, null];
  } catch (error) {
    return [null, error];
  }
};

export { genericFetchData };
