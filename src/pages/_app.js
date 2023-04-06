import { IntlProvider } from 'react-intl'
import { useRouter } from 'next/router'

import messages from '@/data/intl'

import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  let language = 'en'

  if (router.query?.language) {
    language = router.query?.language
  }

  return (
    <IntlProvider messages={ messages[language] ?? messages['en'] } locale={ language } defaultLocale="en">
      <Component {...pageProps} />
    </IntlProvider>
  )
}
