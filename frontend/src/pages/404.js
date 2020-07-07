import Head from 'next/head'
// import { useRouter } from 'next/router'
// import ErrorPage from 'next/error'

import Layout from '@components/Layout'

const Four04 = () => {
  return (
    <Layout>
      <Head>
          <title key="title">404 - Page not found</title>
      </Head>
      <div id="content">
        <h1>404 - Page Not Found</h1>
      </div>
      <style jsx>{`
        #content {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
        }
      `}</style>
    </Layout>
  )
}
export default Four04

