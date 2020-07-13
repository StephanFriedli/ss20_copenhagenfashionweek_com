import React, { useState, useRef, useEffect } from 'react'
import { isAfter, isBefore } from 'date-fns'

import styles from '@styles/modules/PostGrid.module.scss'

import useResize from "@utils/hooks/useResize";
import Brands from '@components/Brands'
import Post from '@components/Post'
import Ad from '@components/Ad'

const PostGrid = ({ preview, brands, posts, ads, openPostModal, time }) => {
  
  const randomAds = ads // todo - randomize!
  const cardNode = useRef([])
  const cardInnerNode = useRef([])
  const [categoryName, setCategoryName] = useState('Show')
  const [brandName, setBrandName] = useState('')
  const [cards, setCards] = useState([])
  

  // Mounted
  useEffect(() => {
    setCardOrder()
  }, []);

  useEffect(() => {
    setCardOrder()
  }, [brandName, categoryName]);

  useEffect(() => {
    resizeGrid()
  }, [cards]);

  

  // Listen to scroll event
  const onResize = (scroll) => {
    setResize(scroll)
  }
  useResize(onResize)

  const setCardOrder = () => {

    // ALWAYS - depending on category
    // UNLESS - BRAND is selected
    let filteredPosts = []
    if (brandName != '') {
      filteredPosts = posts.map((card, index) => {
        // console.log('brand: ', card.brand.title, brandName);
        if (card.brand.title === brandName) {
          return card
        }
      })
      
    } else if (categoryName != '') {
      filteredPosts = posts.map((card, index) => {
        // console.log('category: ', card.category, categoryName);
        if (card.category === categoryName) {
          return card
        }
      })
    }
    filteredPosts = filteredPosts.filter(function (el) {
      return el != null;
    });
    // console.log('filteredPosts: ', filteredPosts);
    

    // Merge Posts & Ads
    let adIndex = 0
    let postIndex = 0
    let items = []
    let length = (filteredPosts.length) + Math.round(filteredPosts.length / 7)
    for (var i = 0; i < length; i++) {
      if (i == 2 || i % 7 == 0 && i != 0) {
        items.push(ads[adIndex])
        adIndex++
        
      } else {
        items.push(filteredPosts[postIndex])
        postIndex++
      }
    }

    setCards(items)
  }

  const onClickCategory = (event, category) => {
    event.preventDefault()
    setCategoryName(category)
  }

  const onChangeBrand = (brand) => {
    setBrandName(brand.title)
  }

  const onCloseBrand = () => {
    setBrandName('')
  }

  const onOpenPostModal = (postData) => {
    openPostModal(postData)
  }

  const resizeGrid = () => {
    // console.log('useRef: ', cardNode.current.length, cards.length);
    for (let i = 0; i < cards.length; i++) {
    // for (let i = 0; i < cardNode.current.length; i++) {
      resizeGridItem(i)
    }
  }
  
  const resizeGridItem = (i) => {
    let item = cardNode.current[i]
    let innerItem = cardInnerNode.current[i]
    var height = innerItem.offsetHeight
    var rowHeight = (window.innerWidth < 1024) ? 10 : (window.innerWidth < 1440) ? 20 : 30;
    var rowSpan = Math.ceil(
      // (height + this.gridRowGap) / (this.gridRowHeight + this.gridRowGap)
      height / rowHeight
    )
    item.style.gridRowEnd = "span " + (rowSpan + 3)
  }

  const setResize = () => {
    console.log('resize');
    
    resizeGrid()
  }

  return (
    <div className={styles.grid}>
      <div className={styles.category}>
        <a href="#" onClick={(event) => onClickCategory(event, 'Show')} className={(categoryName == 'Show') ? styles.active : ''}>Show</a>
        <a href="#" onClick={(event) => onClickCategory(event, 'Event')} className={(categoryName == 'Event') ? styles.active : ''}>Event</a>
      </div>

      <Brands data={brands} changeBrand={onChangeBrand} closeBrand={onCloseBrand} />
      
      <div className={styles.postList}>
        
        {cards.map((item, index) => {
          
          if (item.category === undefined) {
            return (
              <div ref={el => cardNode.current[index] = el} key={index}>
                <div ref={el => cardInnerNode.current[index] = el}>
                  <Ad data={item} />
                </div>
              </div>
            )
            
          } else {
            return (
              <div ref={el => cardNode.current[index] = el} key={index} >
                <div ref={el => cardInnerNode.current[index] = el}>
                  <Post data={item} openPostModal={onOpenPostModal} />
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default PostGrid