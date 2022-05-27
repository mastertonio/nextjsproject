import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../app/context/jwtContext";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </MantineProvider>
  );
}

export default MyApp;
