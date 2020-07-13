import React, { useState } from 'react';
import styles from '@styles/modules/Events.module.scss';

import { isBefore, addDays, isAfter, parseISO, format, compareAsc, isSameDay, isSameHour } from 'date-fns'

import Event from '@components/Event'

const Events = ({ data, time }) => {
  // console.log('EVENT: ', data)
  // const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  // const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  const [category, setCategory] = useState('Official')
  const [internalTime, setInternalTime] = useState('');

  const onClickEventDay = (event, day) => {
    event.preventDefault()
    console.log('onClickEventDay ', day)
    setInternalTime(day)
  }

  return (
    <div className={styles.events}>
      <div className={styles.bar}>
        <div className={styles.eventType}>
          <a href="#" className={styles.link}>Official Schedule</a>
          <a href="#" className={styles.link}>Event Schedule</a>
        </div>

        <div className={styles.pdfs}>
          {data.pdfs.map( (pdf, index) => {
            return (
              <a key={index} href={`${pdf.file}?dl=`} className={styles.link}>
                {pdf.title}
              </a>
            )
          })}
        </div>
      </div>

      <div className={styles.line}></div>

      <div className={styles.daySelector}>
        {data.days.map((day, index) => {
          const month = format(parseISO(day), 'MMM') //=> 'Nov'
          const date = format(parseISO(day), 'io') //=> '6st'
          const weekday = format(parseISO(day), 'EEEE') //=> 'Mon'
          
          // console.log('compare date: ', time.state, compareAsc(time.date, parseISO(day)), day)
          let startDate = (time.state === 'during') ? time.startDate : time.date
          let compareTime = (internalTime == '') ? startDate : internalTime
          let isActive = isSameDay(new Date(compareTime), new Date(day))
          

          return (
            <a
              key={index}
              href="#"
              className={`${styles.link} ${isActive ? styles.active : ''}`}
              onClick={event => onClickEventDay(event, day)}
            >
              {month} {date}<br></br>
              <span>{weekday}</span>
            </a>
          )
        })}
      </div>

      <div className={styles.line}></div>
      
      <div className={styles.events}>

        {time &&
          data.events.filter(function (event) {
            let startDate = (time.state === 'during') ? time.startDate : time.date
            let compareTime = (internalTime == '' ) ? startDate : internalTime
            
            if (isSameDay(new Date(compareTime), new Date(event.startTime)) ) {
              return event
            }
          }).map(function (event) {
            let isActive = isSameHour(new Date(time.userTime), new Date(event.startTime))
            // console.log('isSameHour: ', isActive, new Date(time.userTime), new Date(event.startTime))

            return <Event data={event} key={event.startTime} isActive={isActive} />
          })
        }
      </div>
    </div>
  )
}
export default Events