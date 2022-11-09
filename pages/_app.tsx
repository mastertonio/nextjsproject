import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import DashboardContextProvider from "app/context/dashboard.context";
import { UserContextProvider } from "app/context/user.context";
import { BuilderContextProvider } from "@app/context/builder.context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <MantineProvider>
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
  );
}

export default MyApp;
