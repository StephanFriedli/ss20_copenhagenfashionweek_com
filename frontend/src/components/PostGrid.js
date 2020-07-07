import React, { useState } from 'react'
import { isAfter, isBefore } from 'date-fns'

import styles from '@styles/modules/PostGrid.module.scss'

import Brands from '@components/Brands'
// import PostsList from '@components/PostsList'
import Post from '@components/Post'
import Ad from '@components/Ad'

const PostGrid = ({ preview, brands, posts, ads }) => {
  
  const randomAds = ads // todo - randomize!
  const [category, setCategory] = useState('Show')


  const [cards, setCards] = useState(posts)
  const time = '03d 08h 34m'
  // const isActive = false
  const startTime = new Date('2020-08-10T00:00:00') // data.startTime
  const isActive = isBefore(new Date(), startTime)


  const sortCards = () => {
    let sortedCards = cards.sort()
    setCards(sortedCards)
  }

  const onChangeBrand = (newBrand) => {
    console.log('index: change brand: ', newBrand);
  }

  const onClickCategory = (category) => {
    console.log('category: ', category);
  }

  
  // <Category /> {/* Show || Event */ }
  // <Brands /> {/* All brands. Open close brand (update Posts list) */ }
  // <PostList /> {/* Show all related posts (mix with ads) */ }

  return (
    <div className={styles.grid}>
      
      <div className={styles.category}>
        <a href="#" onClick={onClickCategory('show')} className={styles.active}>Show</a>
        <a href="#" onClick={onClickCategory('event')}>Event</a>
      </div>

      <Brands data={brands} onChangeBrand={onChangeBrand} />
      
      <div className={styles.postList}>
        {posts.map((post, index) => {
          if (index % 3 == 0) {
            // console.log('AD');
            
            return <Ad data={randomAds[index]} key={index} />
          } else {
            // console.log('POST');
            return <Post data={post} key={index} />
          }
          
        })}
      </div>
    </div>
  )
}

export default PostGrid