import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../app/context/jwtContext";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <NotificationsProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
