import "../styles/globals.css";
import '../styles/slick.css';
import '../styles/slick-theme.css';
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import DashboardContextProvider from "app/context/dashboard.context";
import { UserContextProvider } from "app/context/user.context";
import { BuilderContextProvider } from "@app/context/builder.context";
import Head from "next/head";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>The Roi Shop</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
          fontFamily: "Open Sans, sans-serif",
          fontFamilyMonospace: "Monaco, Courier, monospace",
          headings: { fontFamily: "Greycliff CF, sans-serif" },
        }}
      >
        <NotificationsProvider position="bottom-right" zIndex={2077}>
          <UserContextProvider>
            <DashboardContextProvider>
              <BuilderContextProvider>
                <QueryClientProvider client={queryClient}>
                  <Hydrate state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                  </Hydrate>
                </QueryClientProvider>
              </BuilderContextProvider>
            </DashboardContextProvider>
          </UserContextProvider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
