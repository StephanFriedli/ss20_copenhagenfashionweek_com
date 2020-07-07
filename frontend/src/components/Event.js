import { parseISO, format } from 'date-fns'

import styles from '@styles/modules/Event.module.scss'

const Event = ({ data }) => {
  
  const startHour = format(parseISO(data.startTime), 'hh:mm')
  const endHour = format(parseISO(data.endTime), 'hh:mm')

  return (
    <div className={styles.event}>
      <h2 className={styles.title}>{data.title}</h2>
      
      {(data.startTime && data.endTime) &&
        <p className={styles.time}>
          {startHour} - {endHour}
        </p>
      }

      {data.category &&
        <p className={styles.category}>
          {data.category}
        </p>
      }
      {data.label &&
        <p className={styles.label}>
          {data.label}
        </p>
      }
      
      {data.location &&
        <a href={data.location.link} target="_blank" className={styles.location}>
          {data.location.label}
        </a>
      }

      {data.byline &&
        <p className={styles.byline}>
          {data.byline}
        </p>
      }
    </div>
  )
}

export default Event