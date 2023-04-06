import { IntlProvider } from 'react-intl'

import messages from '@/data/intl'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <IntlProvider messages={ messages['es'] } locale="es" defaultLocale="en">
      <Component {...pageProps} />
    </IntlProvider>
  )
}
