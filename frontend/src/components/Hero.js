
import React, { useState, useRef, useEffect } from 'react';
import Player from '@vimeo/player';

import styles from '@styles/modules/Hero.module.scss';



const Hero = ({ data, wop }) => {

  const vimeoNode = useRef(null)

  // Mounted
  useEffect(() => {
    console.log('HERO data: ', data);
    initVimeo()
  }, []);

  const onVimeoLoaded = () => {
    console.log('video loaded!!!');
  }

  const initVimeo = () => {

    var options = {
      url: data.before.vimeo,
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

  return (
    <header className={styles.hero}>
      <h1></h1>

      <div className={styles.scrollText}>
        <p>{data.before.titleLowercase} <span>{data.before.titleUppercase}</span></p>
        <p>{data.before.titleLowercase} <span>{data.before.titleUppercase}</span></p>
        <p>{data.before.titleLowercase} <span>{data.before.titleUppercase}</span></p>
      </div>

      <div className={styles.vimeo} ref={vimeoNode}></div>
    </header>
  )
}
export default Hero