import Head from 'next/head'

export default function Meta() {
  return (
    <Head>

      {/* Override on each Page! */}
      <title key="title">Copenhagen Fashion Week</title>
      <meta name="description" content="" key="description" />
      <meta property="og:title" content="Copenhagen Fashion Week" key="og_title" />
      <meta property="og:description" content="" key="og_description" />
      <meta property="og:image" content="" key="og_image" />

      {/* OG Base */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://cphfw72h.com/" />
      <meta property="og:site_name" content="Copenhagen Fashion Week" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* FAVICONS */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0000ff" />
      <meta name="msapplication-TileColor" content="#0000ff" />
      <meta name="theme-color" content="#ffffff" />
      
    </Head>
  )
}
