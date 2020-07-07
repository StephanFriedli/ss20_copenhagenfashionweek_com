import styles from '@styles/modules/Footer.module.scss';

export default function Footer() {

  return (
    <footer className={styles.footer}>
      <p className={styles.label}>
        Partners
      </p>
      <div className="line"></div>

      <div className={styles.partnerList}>
        <ul>
          {/* map array */}
          <li>
            <a href="http://google.com" target="_blank"><img src="/assets/logo.png"></img></a>
          </li>
          <li>
            <a href="http://google.com" target="_blank"><img src="/assets/logo.png"></img></a>
          </li>
          <li>
            <a href="http://google.com" target="_blank"><img src="/assets/logo.png"></img></a>
          </li>
        </ul>  
      </div>

      <div className="social-media">
        <div className="link">
          <a href="https://facebook.com" target="_blank">Instagram</a>
          <a href="https://facebook.com" target="_blank">Youtube</a>
          <a href="https://facebook.com" target="_blank">Facebook</a>
        </div>
      </div>

    </footer>
  )
}
