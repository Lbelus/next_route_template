import '@/styles/globals.css';
import type { AppProps } from 'next/app';
// import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
// import CookieConsent from 'react-cookie-consent';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* <ThemeProvider enableSystem={true} attribute="class"> */}

        <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </SessionProvider>
  )
}