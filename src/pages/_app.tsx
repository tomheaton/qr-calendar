// import { pageView } from "@/lib/gtag";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import "bootstrap-icons/font/bootstrap-icons.css";
import type { AppType } from "next/app";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";

const App: AppType = ({ Component, pageProps }) => {
  // const router = useRouter();

  // const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   const handleStart = () => {
  //     setLoading(true);
  //   };

  //   const handleComplete = () => {
  //     setLoading(false);
  //   };

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   const handleRouteChange = (url: URL) => {
  //     /*window.gtag('config', `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY}`, {
  //       page_path: url
  //     });*/
  //     pageView(url);
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [router.events]);

  // return loading ? (
  //   <>
  //     <h1>QR Calendar</h1>
  //     <p>loading...</p>
  //   </>
  // ) : (
  //   <Component {...pageProps} />
  // );

  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
};

export default App;
