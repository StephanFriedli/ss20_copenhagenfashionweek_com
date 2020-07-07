import React, { useState } from 'react'
import { isAfter, isBefore } from 'date-fns'

import styles from '@styles/modules/Ad.module.scss'

const Ad = ({ data }) => {

  const time = '03d 08h 34m'
  const isActive = false
  // const startTime = data.startTime
  // const isActive = isBefore(new Date(), startTime)
  // console.log('post data: ', data);
  
  return (
    <a href="#" className={styles.ad}>
      <div className={styles.media}>
        <div className={styles.vimeoContainer}></div>
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