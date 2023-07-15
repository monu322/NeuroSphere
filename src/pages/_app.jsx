import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";
import LoadingScreen from "../components/Loading-Screen/loading-screen";
import Cursor from "../components/Cursor";
import ScrollToTop from "../components/scrollToTop";
import AuthProvider from "../context/AuthProvider";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Head>
          <title>
            NeuroSphere | Web | Mobile | AI | Consulting & Development
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Head>

        <LoadingScreen />
        <Cursor />
        <Component {...pageProps} />
        <ScrollToTop />

        <Script id="wow" src="/assets/js/wow.min.js" />
        <Script id="charming" src="/assets/js/charming.min.js" />
        <Script id="isotope" src="/assets/js/isotope.pkgd.min.js" />
        <Script id="init" src="/assets/js/main.js" strategy="lazyOnload" />
        <Script
          id="simpleParallax"
          src="/assets/js/simpleParallax.min.js"
          strategy="beforeInteractive"
        />
        <Script
          id="splitting"
          src="/assets/js/splitting.min.js"
          strategy="beforeInteractive"
        />
        <Script
          id="bootstrap"
          src="/assets/js/bootstrap.bundle.min.js"
          strategy="beforeInteractive"
        />
      </AuthProvider>
    </>
  );
}

export default MyApp;
