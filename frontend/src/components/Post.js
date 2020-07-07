import React, { useState } from 'react'
import { isAfter, isBefore } from 'date-fns'

import styles from '@styles/modules/Post.module.scss'

const Post = ({ data }) => {

  const time = '03d 08h 34m'
  const isActive = false
  // const startTime = data.startTime
  // const isActive = isBefore(new Date(), startTime)
  // console.log('post data: ', data);
  
  return (
    <div className={styles.post}>
      
      <a href="#" className={styles.card}>
        <div className={styles.media}>
          {/* <img src={}></img> */}
          <div className={styles.vimeoContainer}></div>
          <div className={`${styles.countdown} ${isActive ? styles.active : ''}`}>
            <p className={styles.label}>Visible in</p>
            <p className={styles.time}>{time}</p>
          </div>
        </div>

        <div className={styles.details}>
          <h4 className={styles.label}>
            {data.label}
          </h4>
          <h2 className={styles.cardTitle}>
            {data.title}
          </h2>
        </div>
      </a>
    </div>
  )
}

export default Post