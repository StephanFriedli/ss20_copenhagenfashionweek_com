// import Router from 'next/router'
// import * as gtag from '@utils/gtag'
import '@styles/styles.scss'


// Router.events.on('routeChangeComplete', url => gtag.pageview(url))


const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}
export default App