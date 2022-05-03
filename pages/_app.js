// import { SessionProvider } from 'next-auth/react'
import Head from "next/head";
import "../styles/common.css";
import "../styles/bankicon.css";

function MyApp({ Component, pageProps }) {
  return (
    // <SessionProvider session={pageProps.session}>
    <>
      <Head>
        <meta name="description" content="Latest payment page of justdial" />
        <link
          rel="icon"
          href="https://akam.cdn.jdmagicbox.com/images/icontent/jdrwd/jdlogosvg.svg"
        />
      </Head>
      <Component {...pageProps} />
    </>

    // </SessionProvider>
  );
}

export default MyApp;
