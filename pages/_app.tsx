import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../app/context/jwtContext";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Provider } from "react-redux";
import store from "@redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MantineProvider>
        <NotificationsProvider>
          {/* <UserProvider> */}
            <Component {...pageProps} />
          {/* </UserProvider> */}
        </NotificationsProvider>
      </MantineProvider>
    </Provider>
  );
}

export default MyApp;
