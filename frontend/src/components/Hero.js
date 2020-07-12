import React, { Component } from 'react';
import Player from '@vimeo/player';
// import { isAfter, isBefore, addDays } from 'date-fns'
import styles from '@styles/modules/Hero.module.scss';


class Hero extends Component {

  constructor(props) {
    super(props)

    this.state = {
      time: props.time,
      vimeoUrl: '',
      headlineLowercase: '',
      headlineUppercase: ''
    }
    
    this.vimeoNode = React.createRef()
    
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    let url = ''
    let lowercase = ''
    let uppercase = ''

    if (nextProps.time.day < 1) {
      url = nextProps.data.before.vimeo
      uppercase = nextProps.data.before.titleUppercase
      lowercase = nextProps.data.before.titleLowercase
    } else if (nextProps.time.day == 1) {
      url = nextProps.data.day1.vimeo
      uppercase = nextProps.data.day1.titleUppercase
      lowercase = nextProps.data.day1.titleLowercase
    } else if (nextProps.time.day == 2) {
      url = nextProps.data.day2.vimeo
      uppercase = nextProps.data.day2.titleUppercase
      lowercase = nextProps.data.day2.titleLowercase
    } else if (nextProps.time.day == 3) {
      url = nextProps.data.day3.vimeo
      uppercase = nextProps.data.day3.titleUppercase
      lowercase = nextProps.data.day3.titleLowercase
    } else if (nextProps.time.day > 10) {
      url = nextProps.data.after.vimeo
      uppercase = nextProps.data.after.titleUppercase
      lowercase = nextProps.data.after.titleLowercase
    }

    // Return new state
    // https://larry-price.com/blog/2018/06/27/how-to-use-getderivedstatefromprops-in-react-16-dot-3-plus/
    return {
      time: nextProps.time,
      vimeoUrl: url,
      headlineLowercase: lowercase,
      headlineUppercase: uppercase
    }
  }

  
  componentDidUpdate(prevProps) {
    
    if (this.vimeoPlayer === undefined && this.state.vimeoUrl !== undefined) {
      this.initVimeo()
    } else if (this.vimeoPlayer) {
      this.vimeoPlayer.loadVideo(this.state.vimeoUrl).then(function (id) {
        // the video successfully loaded
        // console.log('video loaded!! ', id);
      }).catch(function (error) {
        console.log('error: ', error);
      });
    }
    
  }

  initVimeo() {
    if (this.state.vimeoUrl == '' && this.state.vimeoUrl == undefined) {
      return
    }
    console.log('init vimeo: ', this.state.vimeoUrl);

    var options = {
      url: this.state.vimeoUrl,
      // id: this.vimeoId,
      // width: 1920,
      // height: 1080,
      autopause: 0,
      autoplay: 1,
      muted: true,
      loop: true,
      responsive: 1, // wrap's player in div with padding-bottom %
      playsinline: 1, // plays inline on supported mobile devices
      controls: 0, // show controls
      portrait: 0, // show video owner's portrait
      title: 0, // show video owner's title
      byline: 0, // display the video owner's name.
      dnt: true, // disable cookies
      outro: 'nothing', // not documented but used on Vimeo.com
      default_to_hd: 1, // not documented but used on Vimeo.com
      // quality: 360p, 540p, 720p, 1080p, 2k, and 4k. // Set initial quality
    };

    // Load Player
    // https://www.npmjs.com/package/@vimeo/player
    console.log('vimeoNode: ', this.vimeoNode.current);
    
    this.vimeoPlayer = new Player(this.vimeoNode.current, options);
    // this.vimeoPlayer.on('loaded', this.onVimeoLoaded);
  }

  // onVimeoLoaded() {
  //   console.log('video loaded!!! ', this.vimeoPlayer);
  // }

  render() {

    return (
      <header className={styles.hero}>
        <div className={styles.scrollText}>
          <p>{this.state.headlineLowercase} <span>{this.state.headlineUppercase}</span></p>
          <p>{this.state.headlineLowercase} <span>{this.state.headlineUppercase}</span></p>
          <p>{this.state.headlineLowercase} <span>{this.state.headlineUppercase}</span></p>
        </div>
        <div className={styles.vimeo} ref={this.vimeoNode}></div>
    </header>
    )
  }
}
export default Hero
