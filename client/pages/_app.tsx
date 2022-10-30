import React, { useRef } from "react";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import {Hydrate} from 'react-query/hydration'
import type { AppProps } from "next/app";
import GlobalStyles from "../styles/Globalstyle";

const App = ({ Component, pageProps }) => {
  const clientRef = useRef(null);
  const getClient = () => {
    if (!clientRef.current)
      clientRef.current = new QueryClient({
        defaultOptions: {
          queries: {
            //  refetchInterval : 10000,
            refetchOnWindowFocus: false,
          },
        },
      });
    return clientRef.current;
  };
  return (
    <QueryClientProvider client={getClient()}>
      <Hydrate state={pageProps.dehydratedState}>
      <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

App.getInitialProps = async ({ ctx, Component }) => {
  const pageProps = await Component.getInitialProps?.(ctx);
  return { pageProps };
};

export default App;
