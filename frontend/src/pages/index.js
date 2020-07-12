import Head from 'next/head'
import React, { useState, useRef, useEffect } from 'react';

import { isAfter, isBefore, addDays, parseISO } from 'date-fns'


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


  const [userTime, setUserTime] = useState(new Date('2020-08-10T00:00:00'))
  const [time, setTime] = useState('')
  const mainNode = useRef(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [scroll, setScroll] = useState({ x: 0, y: 0 })
  const [modalScrollY, setModalScrollY] = useState(0)
  // const time = {}

  // Mounted
  useEffect(() => {
    console.log('mounted');
    calcTime(userTime)
  }, []);

  useEffect(() => {
    console.log('upd userTime');
    calcTime(userTime)
  }, [userTime]);

  // // Listen to scroll event
  // const onScroll = (scroll) => {
  //   // setScroll(scroll)
  // }
  // useScroll(onScroll)

  const onHandleInputChange = (event) => {
    // 2020-08-11T00:00:00
    let userTime = event.target.value
    setUserTime(parseISO(userTime))
  }

  const onHandleInputSubmit = (event) => {
    event.preventDefault()
  }
  

  const onOpenPostModal = (postData) => {
    console.log('Open post modal: ', postData);
    toggleModal()
  }

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


  const calcTime = () => {

    // const timeZone = 'Europe/Copenhagen'
    // const userTime = utcToZonedTime(inputDate, timeZone)
    // export const DATE = new Date('2020-08-10T00:00:00') // new Date('August 10, 2020 00:00:00')

    // TODO  - come from SANITY!
    const day1 = new Date('2020-08-10T00:00:00')
    const day2 = new Date('2020-08-11T00:00:00')
    const day3 = new Date('2020-08-12T00:00:00')

    let timeObj = {}
    timeObj.userTime = userTime ? userTime : new Date(); //new Date('2020-08-11T23:59:00') // local machine time

    
    if (isBefore(timeObj.userTime, day1)) {
      console.log('It hasnt started YET!')
      timeObj.state = 'before'
      timeObj.date = day1 // time everything before this date
      timeObj.day = -99
    } else if (isBefore(timeObj.userTime, day2)) {
      console.log('Its day 1')
      timeObj.state = 'during'
      timeObj.startDate = day1
      timeObj.endDate = day2
      timeObj.day = 1
    } else if (isBefore(timeObj.userTime, day3)) {
      console.log('Its day 2')
      timeObj.state = 'during'
      timeObj.startDate = day2
      timeObj.endDate = day3
      timeObj.day = 2
    } else if (isBefore(timeObj.userTime, addDays(day3, 1))) {
      console.log('Its day3')
      timeObj.state = 'during'
      timeObj.startDate = day3
      timeObj.endDate = addDays(day3, 1)
      timeObj.day = 3

    } else if (isAfter(timeObj.userTime, day3)) {
      console.log('Past the festival');
      timeObj.state = 'after'
      timeObj.date = day3 // query everything before this date
      timeObj.day = 99
    } else {
      console.log('lost in time!');
    }
    
    setTime(timeObj)
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

        
          {/* Title + Play Vimeo (video or livestream)  */}
          <Hero data={data.hero} time={time} />

          {/* Show todays events. Filter 'official' & 'other'. Download pdf schedule etc. */}
          <Events data={data.events} time={time} />

          {/* Show todays events. Filter 'official' & 'other'. Download pdf schedule etc. */}
          <PostGrid 
            time={time}
            brands={data.brands} 
            posts={data.posts} 
            ads={data.ads} 
            openPostModal={onOpenPostModal} 
          />

          {/* Partners */}
          <Footer data={data.footer} />          

          {/* Show next event */}
          <NextUp data={data} />


        </main>
        <PostModal onToggleModal={toggleModal} />
        
        <div className="timeInput">
          <form onSubmit={onHandleInputSubmit}>
            <input type="text" value={userTime} value={userTime} onChange={onHandleInputChange} />
            <input type="submit" value="Submit" />
          </form>
          <p>2020-08-09T00:00:00</p>
          <p>2020-08-10T00:00:00</p>
          <p>2020-08-11T00:00:00</p>
          <p>2020-08-12T00:00:00</p>
        </div>

      </div>

      <style jsx>{`
        .timeInput {
          position: fixed;
          top: 10px;
          right: 10px;
          background: #555;
          padding: 10px;
        }
      `}</style>
    </Layout>
  )
}
export default Index;



export async function getStaticProps({ preview = false, previewData }) {
  
  const siteData = await getSiteOptions(previewData)
  const eventData = await getEvents(previewData)
  const postData = await getPosts(previewData)
  const brandData = await getBrands(previewData)
  const adData = await getAds(previewData)
  
  // siteData: siteData,
  const data = {
    seo: siteData,
    hero: {
      days: siteData.eventDays,
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