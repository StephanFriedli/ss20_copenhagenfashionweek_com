
import { imageBuilder } from '@utils/sanity-api'
import styles from '@styles/modules/Footer.module.scss';

const Footer = ({ data }) => {

  console.log('Footer DATA: ', data);
  
  return (
    <footer className={styles.footer}>
      <p className={styles.label}>
        Partners
      </p>
      <div className={styles.line}></div>

      <div className={styles.partnerList}>
        <ul>
          {data.partners.map((partner, index) => {
            return (
              <li key={index} className={styles.partner}>
                <a href={partner.link} target="_blank">
                  {<img
                    alt='Copenhagen Fashion Week - Image'
                    src={imageBuilder
                      .image(partner.image)
                      // .width(100 * window.devicePixelRatio)
                      .url()
                    }
                  />
                  }
                </a>
              </li>
            )
          })}
        </ul>  
      </div>

      <div className={styles.socialMedia}>
        {data.socialMedia.map((item, index) => {
          return (
            <a key={index} className={styles.link} href={item.link} target="_blank">
              {item.title}
          </a>
          )
        })}
      </div>

    </footer>
  )
}

export default Footer