let id = "",
  source = "",
  version = "",
  module = "";
export default function handler(req, res) {
  const {
    method,
    body: {
      id: getId,
      source: getSource,
      module: getModule,
      version: getVersion,
    } = {},
  } = req || {};
  switch (method) {
    case "POST":
      id = getId;
      source = getSource;
      version = getVersion;
      module = getModule;
      res.status(200).json({ msg: "saved successfully" });
      break;
    case "GET":
      res.status(200).json({ id, source, version, module });
      break;

    default:
      break;
  }
}
