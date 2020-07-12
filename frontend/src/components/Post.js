import React, { useState, useRef, useEffect } from 'react'
import { format, parseISO, isAfter, isBefore, formatDistanceToNow } from 'date-fns'


import { imageBuilder } from '@utils/sanity-api'
import Player from '@vimeo/player'

import styles from '@styles/modules/Post.module.scss'

const Post = ({ data, openPostModal}) => {

  const time = '03d 08h 34m'
  // const isActive = false
  // console.log(data.releaseDate, data.title);
  
  const vimeoNode = useRef(null)

  const timeD = format(parseISO(data.releaseDate), 'dd')
  const timeH = format(parseISO(data.releaseDate), 'HH')
  const timeM = format(parseISO(data.releaseDate), 'mm')

  // distanceInWordsStrict(
  //   new Date(1986, 3, 4, 10, 32, 0),
  //   new Date(1986, 3, 4, 10, 33, 1),
  //   { unit: 'm' }
  // )

  // var result1 = formatDistanceToNowStrict(new Date(2014, 6, 2), {unit: '' }) //'minute' | 'hour' | 'day'} )
  // var result2 = formatDistanceToNowStrict(new Date(2014, 6, 2), { unit: '' })
  // var result3 = formatDistanceToNowStrict(new Date(2014, 6, 2))
  // console.log(result1, result2, result3);
  

  // const publicTime = 
  // const month = format(parseISO(day), 'MMM') //=> 'Nov'
  const hasEventStarted = isBefore(new Date(), parseISO(data.releaseDate))
  const isActive = false
  
  // console.log('data: ', isActive, data);
  const mediaType = data.media[0]._type
  

  // Mounted
  useEffect(() => {
    
    // console.log('media:', data.test, data.test.photo, data.coverPhoto);
    
    // console.log('effects ---------- ', mediaType, data.title);
    
    if (mediaType === 'video') {
      
      var options = {
        url: data.media[0].vimeoUrl,
        // id: this.vimeoId,
        // width: 1920,
        // height: 1080,
        autopause: 0,
        autoplay: 1,
        muted: true,
        loop: true,
        responsive: 1, // wrap's player in div with padding-bottom %
        playsinline: 1, // plays inline on supported mobile devices
        controls: 0, // show controls
        portrait: 0, // show video owner's portrait
        title: 0, // show video owner's title
        byline: 0, // display the video owner's name.
        dnt: true, // disable cookies
        outro: 'nothing', // not documented but used on Vimeo.com
        default_to_hd: 1, // not documented but used on Vimeo.com
        // quality: 360p, 540p, 720p, 1080p, 2k, and 4k. // Set initial quality
      };

      // Load Player
      // https://www.npmjs.com/package/@vimeo/player
      if (vimeoPlayer) {
        vimeoPlayer.off('loaded', onVimeoLoaded);
        vimeoPlayer.destroy().then(function () {
          console.log('vimeo destroyed');
        })
      }
      const vimeoPlayer = new Player(vimeoNode.current, options);
      vimeoPlayer.on('loaded', onVimeoLoaded);

      console.log('MOUNTED video!');

    }

    return function cleanup() {
      console.log('cleanup --- ', mediaType);
      if (mediaType === 'video') {
        console.log('destroy vimeo ');
        // vimeoPlayer.off('loaded', onVimeoLoaded);
        // vimeoPlayer.destroy().then(function () {
        //   console.log('vimeo destroyed');
        // })
      }
    }
  }, []);

  const onVimeoLoaded = () => {
    console.log('post video loaded!!!');
  }

  const onOpenPostModal = (event) => {

    event.preventDefault()
    console.log('onOpenPostModal ', event );
    openPostModal(data)
    
  }

  return (
  
    <a href="#" className={styles.post} onClick={onOpenPostModal}>
      <div className={styles.media}>
        
        {(mediaType === 'image') &&
          <div className={styles.imageContainer}>
            <img
              alt='Copenhagen Fashion Week - Image'
              src={imageBuilder
                  .image(data.media[0])
                  .width( Math.round((window.innerWidth/3) * window.devicePixelRatio) )
                  .url()
                }
            />
            <div className={styles.dark}></div>
          </div>
        }

        {(mediaType === 'video') &&
          <div className={styles.vimeoContainer} ref={vimeoNode}></div>
        }
        
        <div className={`${styles.countdown} ${isActive ? styles.active : ''}`}>
          <p className={styles.label}>Visible in</p>
          <p className={styles.time}>{timeD}d {timeH}h {timeM}m</p>
          
        </div>
      </div>

      <div className={styles.details}>
        <h4 className={styles.category}>
          {data.category}
        </h4>
        <h2 className={styles.cardTitle}>
          {data.title}
        </h2>
      </div>
    </a>
  )
}

export default Post