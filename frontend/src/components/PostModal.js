
import React, { useEffect, useState, useRef } from 'react'
import BlockContent from '@sanity/block-content-to-react'
import { imageBuilder } from '@utils/sanity-api'
import gsap from 'gsap'
import styles from '@styles/modules/PostModal.module.scss'

const PostModal = ({ data, isOpen, onCloseModal }) => {

  const [isActive, setIsActive] = useState(false)
  const modalNode = useRef(null)

  useEffect(() => {
    if (isOpen) {
      console.log('OPEN: ', data.title)
      gsap.set(modalNode.current, { display: 'block'  })
      // onOpen()

    } else {
      console.log('Close');
      gsap.set(modalNode.current, { display: 'none' })
      // onCloseModal()
      // onClose()
    }
  }, [isOpen]);

  // useEffect(() => {
  //   console.log('data changed: ', data);
    
  //   if (data !== undefined && data.title !== '') {
  //     console.log('modal data: ', data.title);
  //     // setIsActive(true)
  //     onToggle()
      
  //   } else {
  //     console.log('NO modal data');
  //     if (isActive) {
  //       setIsActive(false)
  //     }
  //   }

  // }, [data]);

  useEffect( () => {
    if (isActive) {
      gsap.set(modalNode.current, { display: 'block'  })
    }

    // console.log('DATA POST: ', data);
  }, [])

  
  

  // const onToggle = () => {
  //   if (isActive) {
  //     onClose()
  //   } else {
  //     onOpen()
  //   }
  // }
// componentDidUpdate(prevProps) {

// }

  const onOpen = () => {

    // gsap.to(contactNode.current, {
    //   duration: 0.6,
    //   ease: 'quart.inOut',
    //   width: 'calc(100% - 1.4rem)',
    // })

    // gsap.set(modalNode.current, { display: 'block' })
    // gsap.to(modalNode.current, {
    //   duration: 0.3,
    //   delay: 0.6,
    //   opacity: 1,
    // })

    

    gsap.set(modalNode.current, { display: 'block' })

    // onToggleModal()
    setIsActive(true)
  }

  const onClose = () => {

    // gsap.to(modalNode.current, {
    //   duration: 0.3,
    //   opacity: 0,
    //   onComplete: () => {
    //     gsap.set(modalNode.current, { display: 'none' })
    //   }
    // })

    // gsap.to(contactNode.current, {
    //   duration: 0.6,
    //   ease: 'quart.inOut',
    //   width: '1.4rem',
    // })


    gsap.set(modalNode.current, { display: 'none' })
    
    onCloseModal()
    setIsActive(false)
  }

  // const ctaText = isActive ? 'Go back / Fonts' : 'About / Contact'
  
  return (
    <>

      <div className={styles.modal} ref={modalNode}>
        <div className={styles.background}></div>

        <div className={styles.content}>

          <div className={styles.close} onClick={onClose}>Close</div>

          {data &&
            <>
              <div className={styles.media}>
                {(data.media[0]._type === 'image') &&
                  <div className={styles.imageContainer}>
                    <img
                      alt='Copenhagen Fashion Week - Image'
                      src={imageBuilder
                        .image(data.media[0])
                        .width(Math.round((window.innerWidth * 0.75) * window.devicePixelRatio))
                        .url()
                      }
                    />
                    <div className={styles.dark}></div>
                  </div>
                }

                {(data.media._type === 'video') &&
                  <div className={styles.vimeoContainer} ref={vimeoNode}></div>
                }
              </div>

              <div className={styles.article}>
                <p className={styles.date}>{data.releaseDate}</p>
                <h1 className={styles.title}>{data.title}</h1>
                <div className={styles.p}>
                  <BlockContent blocks={data.text} />
                </div>
              </div>

              <div className={styles.line}></div>

              <div className={styles.nextPost}>
                <p className={styles.label}>Next post</p>
                <p className={styles.title}>A New Intimate Fashion Experience</p>
              </div>
            </>
          }
        </div>
      </div>
    </>
  )
}

export default PostModal