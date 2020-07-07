import styles from '@styles/modules/PreviewNotice.module.scss'

const PreviewNotice = ({ preview }) => {
  return (
    <>
    {preview && (
        <div className={styles.fixed}>
          <div className={styles.notice}>
              This is page is a preview. <a href="/api/exit-preview">Click here</a> to exit preview mode.
          </div>
      </div>
    )}
    </>
  )
}

export default PreviewNotice