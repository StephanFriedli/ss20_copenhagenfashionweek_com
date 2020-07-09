import React, { useState } from 'react'
import BlockContent from '@sanity/block-content-to-react'

import styles from '@styles/modules/Brands.module.scss';

const Brands = ({ data, changeBrand, closeBrand }) => {

  const [selectedBrand, setSelectedBrand] = useState('')
  // console.log('brands: ', data)
  const onChangeBrand = (event, brand) => {
    event.preventDefault()
    console.log('onChangeBrand ', event, brand);
    
    changeBrand(brand) // update posts list - match this brand
    setSelectedBrand(brand)
  }

  const onCloseBrand = () => {
    setSelectedBrand('')
    closeBrand()
  }

  const serializers = {
    types: {
      code: props => (
        <pre data-language={props.node.language}>
          <code>{props.node.code}</code>
        </pre>
      )
    }
  }

  return (
    <>
      <div className={styles.brands}>

        <div className={styles.bar}>
          <h2 className={styles.label}>Brands</h2>
          {(selectedBrand != '') &&
          <p className={styles.close} onClick={onCloseBrand}>Close</p>
          }
        </div>
        <div className={styles.line}></div>

        <div className={styles.brandList}>
          {data.map((brand, index) => {
            return (
              <a
                href="#"
                className={styles.brand}
                key={index}
                onClick={(event) => onChangeBrand(event, brand)}
              >
                <h2>{brand.title.toLowerCase()}</h2>
              </a>
            )
          })}
        </div>

      </div>
          
      {(selectedBrand != '') &&
      <div className={styles.brand}>

        <div className={styles.introduction}>
          <h2 className={styles.title}>
            {selectedBrand.title.toUpperCase()}
          </h2>
          <BlockContent blocks={selectedBrand.text} serializers={serializers} />,
        </div>
        
        

        <div className={styles.details}>
          <div className={`${styles.row} ${styles.row1}`}>
            <p className={styles.label}>the show</p>
          </div>
          <div className={`${styles.row} ${styles.row2}`}>
            <p className={styles.label}>material downloads</p>
          </div>
          <div className={`${styles.row} ${styles.row3}`}>
            <p className={styles.label}>contact</p>
          </div>
          <div className={`${styles.row} ${styles.row4}`}>
            <p className={styles.label}>links</p>
          </div>
        </div>

        <div className={styles.line}></div>
        
        <div className={styles.details}>
          <div className={`${styles.row} ${styles.row1}`}>
            <div className={styles.event}>
              <p className={styles.date}>aug 10th</p>
              <p className={styles.time}>15:00 - 16:00 CET</p>
              <div className={styles.address}>
                <a href={`http://google.com`} target='_blank' className={styles.link}>
                  HDR DENMARK<br></br>
                  JENAGADE 22, CPH S
                </a>
              </div>
            </div>
          </div>
          <div className={`${styles.row} ${styles.row2}`}>
            <div className={styles.downloads}>
              <ul>
                { /*map */}
                <li className={styles.item}>
                  <a href={`http://google.com`} target='_blank' className={styles.link}>
                    Cecilie Bahnsen AW20 press release
                  </a>
                </li>
                <li className={styles.item}>
                  <a href={`http://google.com`} target='_blank' className={styles.link}>
                    Cecilie Bahnsen AW20 press release
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${styles.row} ${styles.row3}`}>
            <div className={styles.contact}>
              <ul>
                { /*map */}
                <li className={styles.item}>
                  <p className={styles.label}>Press</p>
                  <p className={styles.name}>Lucy Jones</p>
                  <a href={`mailto:ceciliebahnsen@karlaotto.com`} className={styles.link}>
                    ceciliebahnsen@karlaotto.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className={`${styles.row} ${styles.row4}`}>
            <div className={styles.social}>
              <ul>
                { /*map */}
                <li className={styles.item}>
                  <a href={`http://google.com`} className={styles.link}>
                    website
                  </a>
                </li>

                <li className={styles.item}>
                  <a href={`http://google.com`} className={styles.link}>
                    instagram
                  </a>
                </li>
                <li className={styles.item}>
                  <a href={`http://google.com`} className={styles.link}>
                    facebook
                  </a>
                </li>
                <li className={styles.item}>
                  <a href={`http://google.com`} className={styles.link}>
                    twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      }
    </>
  )
}

export default Brands