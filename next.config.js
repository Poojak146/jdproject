const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

const { createSecureHeaders } = require("next-secure-headers");

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    (phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD) &&
    process.env.STAGING !== "1";
  // when `next build` or `npm run build` is used
  const isStaging =
    (phase === PHASE_PRODUCTION_SERVER || phase === PHASE_PRODUCTION_BUILD) &&
    process.env.STAGING === "1";

  //console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`)

  const BASE_PATH = "/v1";
  let domain = "https://wap.justdial.com";
  let domain_ip = "https://wap.justdial.com";
  // next.config.js object
  // basePath: '/online-consult',
  if (isStaging) {
    domain = "https://stagingjdpay2.justdial.com";
    domain_ip = "http://192.168.1.80:3011";
  } else if (isDev) {
    domain = "https://securepg.justdial.com/";
    domain_ip = "http://project01.albertcy.mum.jdsoftware.com";
  } else if (isProd) {
    domain = "https://securepg.justdial.com/";
    domain_ip = "http://project01.albertcy.mum.jdsoftware.com";
  }
  const env = {
    IS_STAGING: isStaging,
    DOMAIN: domain + BASE_PATH + "/",
    DOMAIN_DEV: domain_ip,
    API_DOMAIN_CLIENT: domain + BASE_PATH + "/api/",
    API_DOMAIN_SERVER: domain_ip + BASE_PATH + "/api/",
  };
  // next.config.js object
  // basePath: '/jdpay2/vkyc',
  return {
    async headers() {
      return [{ source: "/(.*)", headers: createSecureHeaders() }];
    },
    env,
    basePath: BASE_PATH,
    generateBuildId: async () => {
      return "newBuildIdForPg";
    },
    // from initial app
    reactStrictMode: true,
    swcMinify: false, // it should be false by default
    redirects: async () => {
      return [
        {
          source: "/",
          destination: "/processTransaction",
          permanent: false,
        },
      ];
    },
    images: {
      domains: ["akam.cdn.jdmagicbox.com"],
    },
  };
};
