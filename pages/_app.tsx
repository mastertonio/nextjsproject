import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Provider } from "react-redux";
import store from "@redux/store";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import DashboardContextProvider from "app/context/dashboard.context";
import UserContextProvider from "app/context/user.context";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MantineProvider>
        <NotificationsProvider>
          <UserContextProvider>
            <DashboardContextProvider>
              <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                  <Component {...pageProps} />
                </Hydrate>
              </QueryClientProvider>
            </DashboardContextProvider>
          </UserContextProvider>
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default MyApp;
