import "../styles/globals.css";
import '../styles/slick.css';
import '../styles/slick-theme.css';
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";
import DashboardContextProvider from "app/context/dashboard.context";
import { UserContextProvider } from "app/context/user.context";
import { BuilderContextProvider } from "@app/context/builder.context";
import Head from "next/head";
import axios, { AxiosError } from "axios";
import router, { useRouter } from "next/router";
import { SessionProvider, signOut, useSession } from "next-auth/react"


process.env.NODE_ENV == "production" ? axios.defaults.baseURL = process.env.NEXT_PUBLIC_PROD_PORT : axios.defaults.baseURL = process.env.NEXT_PUBLIC_DEV_PORT
axios.defaults.withCredentials = true


const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        // onError: (error) => {
        //   if (error instanceof AxiosError) {
        //     if (error.response?.status === 401) {
        //       router.push('/401')
        //     } else if (error.response?.status === 403) {
        //       router.push('/403')
        //     }
        //   }
        // },
      },
    },
  });

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  
  

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
        <SessionProvider session={pageProps.session}>
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
        </SessionProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
