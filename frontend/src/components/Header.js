import styles from '@styles/modules/Header.module.scss';

export default function Header() {

  return (
    <header className={styles.header}>
      <img className={styles.logo} src="/images/logo.svg"></img>
    </header>
  )
}
