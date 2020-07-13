import { parseISO, format } from 'date-fns'

import styles from '@styles/modules/Event.module.scss'

const Event = ({ data, isActive }) => {
  
  const startHour = format(parseISO(data.startTime), 'HH:mm')
  const endHour = format(parseISO(data.endTime), 'HH:mm')

  return (
    <div className={`${styles.event} ${isActive ? styles.active : ''}`}>
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