import { IntlProvider } from 'react-intl'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const messages = require('../data/intl/en.json');
  return (
    <IntlProvider messages={ messages } locale="en" defaultLocale="en">
      <Component {...pageProps} />
    </IntlProvider>
  )
}
