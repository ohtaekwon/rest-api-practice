import React from "react";
import "./index.scss";
import { Hydrate } from "react-query/hydration";

// 기본적으로 방식이 아래와 같이 정해져있다.
const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

App.getInitialProps = async ({ ctx, Component }) => {
  const pageProps = await Component.getInitialProps?.(ctx);
  return { pageProps };
};

export default App;
