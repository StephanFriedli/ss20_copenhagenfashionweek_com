import styles from '@styles/modules/Events.module.scss';

import { parseISO, format, compareAsc } from 'date-fns'

import Event from '@components/Event'

const Events = ({ data, time }) => {
  // console.log('EVENT: ', data)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

  const onClickEventDay = () => {
    console.log('onClickEventDay')
  }

  return (
    <header className={styles.events}>
      
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
          let isActive = (time.state === 'during' && compareAsc(time.date, parseISO(day)) === 0) ? true : false
          // let isActive = (compareAsc(time.date, parseISO(day)) === 0) ? true : false

          return (
            <a
              key={index}
              href="#"
              className={`${styles.link} ${isActive ? styles.active : ''}`}
              onClick={onClickEventDay}
            >
              {month} {date}<br></br>
              <span>{weekday}</span>
            </a>
          )
        })}
      </div>

      <div className={styles.line}></div>
      
      <div className={styles.events}>
        {data.events.map((event, index) => {
          return <Event data={event} key={index} />
        })}
      </div>

    </header>
  )
}
export default Events