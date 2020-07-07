import Head from 'next/head'
import React, { useState, useRef, useEffect } from 'react';

import { isAfter, isBefore, addDays } from 'date-fns'

// import { CFW_START_DATE } from '@utils/constants'
import { getSiteOptions, getEvents, getPosts, getBrands, getAds } from '@utils/sanity-api'
import useScroll from "@utils/hooks/useScroll";
import Layout from '@components/Layout'
import PostModal from '@components/PostModal'

import Header from '@components/Header'
import Hero from '@components/Hero'
import NextUp from '@components/NextUp'
import Events from '@components/Events'
import PostGrid from '@components/PostGrid'
import Footer from '@components/Footer'


const Index = ({ data, preview }) => {

  // console.log('hero: ', data.hero);
  // console.log('event: ', data.events);
  // console.log('posts: ', data.posts);
  // console.log('brands: ', data.brands);


  const mainNode = useRef(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [scroll, setScroll] = useState({ x: 0, y: 0 })
  const [modalScrollY, setModalScrollY] = useState(0)

  const time = setTime()

  // // Mounted
  // useEffect(() => {
  //   setTime()
  // }, []);

  // // Listen to scroll event
  // const onScroll = (scroll) => {
  //   setScroll(scroll)
  // }
  // useScroll(onScroll)


  const toggleModal = () => {
    const isOpen = !modalIsOpen

    // OPEN
    if (isOpen) {
      mainNode.current.style.position = 'fixed'
      // TODO
      mainNode.current.style.width = 'calc(100vw)' // 16 == scrollbar 
      mainNode.current.style.top = -scroll.y + 'px'

      window.scrollTo(0, 0)
      setModalScrollY(scroll.y)
    }
    // CLOSE
    else {
      console.log('modalScrollY: ', modalScrollY);

      mainNode.current.style.position = ''
      mainNode.current.style.width = ''
      mainNode.current.style.top = ''

      window.scrollTo(0, modalScrollY)
    }

    setModalIsOpen(isOpen)
  }

  return (
    <Layout preview={preview}>
      <Head>
        <title key="title">Copenhagen Fashion Week 10-12aug 2020</title>
        <meta name="description" content="" key="description" />
        <meta property="og:title" content="" key="og_title" />
        <meta property="og:description" content="" key="og_description" />
        <meta property="og:image" content="" key="og_image" />
      </Head>

      <div id="content">
        <main ref={mainNode}>

          <Header />

          {/* Title + Play Vimeo (video or livestream) */}
          <Hero data={data.hero} time={time} />

          {/* Show next event */}
          <NextUp data={data} />

          {/* Show todays events. Filter 'official' & 'other'. Download pdf schedule etc. */}
          <Events data={data.events} time={time} />

          {/* Show todays events. Filter 'official' & 'other'. Download pdf schedule etc. */}
          <PostGrid brands={data.brands} posts={data.posts} ads={data.ads} />

          {/* Partners */}
          <Footer data={data.footer} />          

        </main>
        {/* <PostModal onToggleModal={toggleModal} /> */}
      </div>


    </Layout>
  )
}
export default Index;


const setTime = () => {
  
  // const timeZone = 'Europe/Copenhagen'
  // const userTime = utcToZonedTime(inputDate, timeZone)
  // export const CFW_START_DATE = new Date('2020-08-10T00:00:00') // new Date('August 10, 2020 00:00:00')
  
  const day1 = new Date('2020-08-10T00:00:00')
  const day2 = new Date('2020-08-11T00:00:00')
  const day3 = new Date('2020-08-12T00:00:00')

  const time = {}
  time.userTime = new Date() //new Date('2020-08-11T23:59:00') // local machine time

  if (isBefore(time.userTime, day1)) {
    console.log('It hasnt started YET!')
    time.state = 'before'
    time.date = day1 // time everything before this date
    time.day = -99
  } else if (isAfter(time.userTime, day1) && isBefore(time.userTime, day2)) {
    console.log('Its day 1')
    time.state = 'during'
    time.startDate = day1
    time.endDate = day2
    time.day = 1
  } else if (isAfter(time.userTime, day2) && isBefore(time.userTime, day3)) {
    console.log('Its day 2')
    time.state = 'during'
    time.startDate = day2
    time.endDate = day3
    time.day = 2
  } else if (isAfter(time.userTime, day3) && isBefore(time.userTime, addDays(day3, 1))) {
    console.log('Its day3')
    time.state = 'during'
    time.startDate = day3
    time.endDate = addDays(day3, 1)
    time.day = 3

  } else if (isAfter(time.userTime, day3)) {
    console.log('Past the festival');
    time.state = 'after'
    time.date = day3 // query everything before this date
    time.day = 99
  } else {
    console.log('lost in time!');
  }

  return time
}

export async function getStaticProps({ preview = false, previewData }) {
  let time = setTime()
  
  const siteData = await getSiteOptions(previewData)
  const eventData = await getEvents(previewData)
  const postData = await getPosts(previewData, time)
  const brandData = await getBrands(previewData)
  const adData = await getAds(previewData)
  
  // siteData: siteData,
  const data = {
    seo: siteData,
    hero: {
      before: siteData.before,
      day1: siteData.day1,
      day2: siteData.day2,
      day3: siteData.day3,
      after: siteData.after
    },
    events: { 
      events: eventData,
      days: siteData.eventDays,
      pdfs: siteData.pdfs,
    },
    posts: postData,
    brands: brandData,
    ads: adData,
    footer: {},
  }
  return {
    props: { data, preview },
  }
}

// export async function getStaticProps({ preview = false, previewData }) {  
//   const data = await getDataForHome(previewData)
//   return {
//     props: { data, preview },
//   }
// }