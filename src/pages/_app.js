import "@/styles/globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "@material-ui/core";
// import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextNProgress from "nextjs-progressbar";
import { UserContext } from "@/context/userContext";
import { useState } from "react";
const clientSideEmotionCache = createEmotionCache();

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  return (
    <UserContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
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
    </UserContext.Provider>
  );
}
