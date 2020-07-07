import { useEffect, useLayoutEffect } from 'react'

const isBrowser = typeof window !== 'undefined'
const useIsomorphicLayoutEffect = (isBrowser) ? useLayoutEffect : useEffect
const getSize = () => isBrowser ? { width: window.innerWidth, height: window.innerHeight } : { width: 0, height: 0 }

function useResize(callback) {

  // useLayoutEffect is prefered, runs after DOM update
  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return
    }

    const resizeListener = () => {
      // change width from the state object
      callback(getSize())
    }
    // set resize listener
    window.addEventListener('resize', resizeListener)

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener)
    }
  })

  // return getSize()
}
export default useResize
