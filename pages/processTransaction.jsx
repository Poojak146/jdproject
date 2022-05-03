import bodyParser from "body-parser";
import { promisify } from "util";

export default function Home() {
  return <div>This page should not be seen</div>;
}

const getBody = promisify(bodyParser.urlencoded({ extended: true }));
export const getServerSideProps = async (ctx) => {
  const { query, req, res } = ctx || {};
  const {
    id: idByGet = "",
    source: sourceByGet = "",
    version: versionByGet = "",
    module: moduleByGet = "",
  } = query || {};
  let idByPost = "";
  let sourceByPost = "";
  let versionByPost = "";
  let moduleByPost = "";
  if (req.method === "POST") {
    await getBody(req, res);
    const { id = "", source = "", version = "", module = "" } = req.body || {};
    idByPost = id;
    sourceByPost = source;
    versionByPost = version;
    moduleByPost = module;
  }
  const id = idByGet || idByPost;
  const source = sourceByGet || sourceByPost;
  const version = versionByGet || versionByPost;
  const module = moduleByGet || moduleByPost;

  return {
    redirect: {
      permanent: false,
      destination: `/processTransactionRedirected?id=${id}&source=${source}&version=${version}&module=${module}`,
    },
    props: {},
  };
};
