import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext, UserProvider, useUser} from "../app/context/jwtContext"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}

export default MyApp
