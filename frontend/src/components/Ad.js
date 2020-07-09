import React, { useEffect } from 'react'

import { imageBuilder } from '@utils/sanity-api'
import Player from '@vimeo/player'

import styles from '@styles/modules/Ad.module.scss'

const Ad = ({ data }) => {
  // console.log('AD: ', data);
  const mediaType = data.media[0]._type

  // Mounted
  useEffect(() => {

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
      const vimeoPlayer = new Player(vimeoNode.current, options);
      vimeoPlayer.on('loaded', onVimeoLoaded);
    }

  }, []);

  const onVimeoLoaded = () => {
    // console.log('video loaded!!!');
  }


  return (
    <a href="#" className={styles.ad}>
      <div className={styles.media}>
        {(mediaType === 'image') &&
          <img
            alt='Copenhagen Fashion Week - Image'
            src={imageBuilder
              .image(data.media[0])
              .width(Math.round((window.innerWidth / 3) * window.devicePixelRatio))
              .url()
            }
          />
        }

        {(mediaType === 'video') &&
          <div className={styles.vimeoContainer} ref={vimeoNode}></div>
        }
      </div>

      <div className={styles.details}>
        <h4 className={styles.label}>
          Advertising
        </h4>
        <h2 className={styles.adTitle}>
          {data.text}
        </h2>
      </div>
    </a>
  )
}

export default Ad