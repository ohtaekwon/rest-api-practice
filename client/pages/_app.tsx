import React, { FC, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import GlobalStyles from "../styles/Globalstyle";

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

App.getInitialProps = async ({ ctx, Component }) => {
  const pageProps = await Component.getInitialProps?.(ctx);
  return <GlobalStyles>{pageProps}</GlobalStyles>;
};

export default App;
