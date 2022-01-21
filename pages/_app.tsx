import type { AppProps } from 'next/app'
import Layout from '../components/layout'


import '../styles/base.css'

function MyApp({ Component, pageProps }: AppProps) {
      return (<Component {...pageProps} />)
}

export default MyApp

