
import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import styles from '@styles/modules/PostModal.module.scss'

const Contact = ({ onToggleModal }) => {

  const [isActive, setIsActive] = useState(false)
  const contactNode = useRef(null)
  const articleNode = useRef(null)

  useEffect( () => {
    gsap.set(articleNode.current, {display: 'none', opacity: 0})
  }, [])

  const onToggle = () => {
    if (isActive) {
      onClose()
    } else {
      onOpen()
    }
  }

  const onOpen = () => {

    gsap.to(contactNode.current, {
      duration: 0.6,
      ease: 'quart.inOut',
      width: 'calc(100% - 1.4rem)',
    })

    gsap.set(articleNode.current, { display: 'block' })
    gsap.to(articleNode.current, {
      duration: 0.3,
      delay: 0.6,
      opacity: 1,
    })

    onToggleModal()
    setIsActive(true)
  }

  const onClose = () => {

    gsap.to(articleNode.current, {
      duration: 0.3,
      opacity: 0,
      onComplete: () => {
        gsap.set(articleNode.current, { display: 'none' })
      }
    })

    gsap.to(contactNode.current, {
      duration: 0.6,
      ease: 'quart.inOut',
      width: '1.4rem',
    })

    

    onToggleModal()
    setIsActive(false)
  }

  const ctaText = isActive ? 'Go back / Fonts' : 'About / Contact'
  
  return (
    <>
      <div className={styles.contact} ref={contactNode}>
        <div className={styles.sidebar} onClick={onToggle} >
          <div className={styles.cta}>
            <p className={styles.link}>{ctaText}</p>
          </div>
        </div>
      </div>
      
      <div className={styles.article} ref={articleNode}>
        <p>Hello,</p>

        <p>
          Here is Clara, a French type designer based in Copenhagen, Denmark.
          After spending the last 5 years between Playtype/e-Types and Kontrapunkt, I am now setting up shop.
          I design retail typefaces and as well as custom productions for specific clients. Concept, design, glyph finalisation, spacing, kerning, opentype features, variable fonts and delivering files hold no secrets for me. I work together with design agencies, marketing departments or smaller units, always hand-in-hand, to create unique and timeless typefaces. 
        </p>
        <p>
          I have worked on projects for clients such as Maersk, Nissan, Shiseido, The Index Project, Tuborg, Vero Moda, Air Canada, Danish Crown, MobilePay, Vipp, Datsun, Novo Nordisk, FC København, UPS, EKF, alongside the great teams of Playtype, e-Types and Kontrapunkt.
        </p>
        <p>
          If you feel like reaching out or grab a coffee, please do:
          <a href="mailto:hello@clarajullienisaksson.com"></a> 
          <a href="" target="_blank">LinkedIn</a> 
        </p>

        <p>Hi, I'm Clara Jullien Isaksson,</p>
        <p>French type designer based in Copenhagen, Denmark.</p>
        <p>Having worked at Playtype / e-Types and Kontrapunkt over the last five years, I worked on retail fonts, as well as custom productions for specific clients. Concept, design, glyph polishing, spacing, kerning, opentype features, variable fonts and delivery</p>
        <p>Contact me via <a href="">LinkedIn</a></p>
      </div>

    </>
  )
}

export default Contact