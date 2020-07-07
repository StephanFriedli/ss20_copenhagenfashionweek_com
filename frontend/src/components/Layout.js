
// import React, {useState} from 'react'
// import FontFaceObserver from 'fontfaceobserver'
import PreviewNotice from '@components/PreviewNotice'
import Meta from '@components/Meta'
// import Loading from '@components/Loading'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <main id="page">
        {<PreviewNotice preview={preview} /> }
        {children}
      </main>
    </>
  )
}
