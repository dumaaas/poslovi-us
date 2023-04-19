import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "@/components/layout";

import { ThemeProvider } from "@material-ui/core";
import { CacheProvider } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";

import NextNProgress from "nextjs-progressbar";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducerFn from "@/store";

require('default-passive-events');

const myStore = createStore(reducerFn);
const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={myStore}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <Layout>
            <NextNProgress
              color="#EF4444"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
            />
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
