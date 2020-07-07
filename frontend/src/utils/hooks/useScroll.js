import { useState, useRef, useEffect, useLayoutEffect } from 'react'

const isBrowser = typeof window !== 'undefined'
const useIsomorphicLayoutEffect = (isBrowser) ? useLayoutEffect : useEffect
const getPosition = () => isBrowser ? { x: window.scrollX, y: window.scrollY } : { x: 0, y: 0 }

function useScroll(callback) {

  // useLayoutEffect is prefered, runs after DOM update
  useIsomorphicLayoutEffect(() => {
    if (!isBrowser) {
      return
    }
    
    const scrollListener = () => {
      // change width from the state object
      callback(getPosition())
    }
    // set scroll listener
    window.addEventListener('scroll', scrollListener)

    // clean up function
    return () => {
      // remove scroll listener
      window.removeEventListener('scroll', scrollListener)
    }

  })

  // return getPosition()
}
export default useScroll



// // Three versions
// https://github.com/dejorrit/scroll-data-hook
// https://usehooks.com/useEventListener/
// https://github.com/n8tb1t/use-scroll-position

// VERSION ONE ----------------------------------------------------------------------------------------------------------
// // https://usehooks.com/useEventListener/
// import { useState, useRef, useEffect, useCallback } from 'react';

// // Usage
// function App() {
//   // State for storing mouse coordinates
//   const [coords, setCoords] = useState({ x: 0, y: 0 });

//   // Event handler utilizing useCallback ...
//   // ... so that reference never changes.
//   const handler = useCallback(
//     ({ clientX, clientY }) => {
//       // Update coordinates
//       setCoords({ x: clientX, y: clientY });
//     },
//     [setCoords]
//   );

//   // Add event listener using our hook
//   useEventListener('mousemove', handler);
//   return (
//     <h1>
//       The mouse position is ({coords.x}, {coords.y})
//     </h1>
//   );
// }




// function useEventListener(eventName, handler, element = window) {
//   // Create a ref that stores handler
//   const savedHandler = useRef();

//   // Update ref.current value if handler changes.
//   // This allows our effect below to always get latest handler ...
//   // ... without us needing to pass it in effect deps array ...
//   // ... and potentially cause effect to re-run every render.
//   useEffect(() => {
//     savedHandler.current = handler;
//   }, [handler]);

//   useEffect(
//     () => {
//       // Make sure element supports addEventListener
//       // On 
//       const isSupported = element && element.addEventListener;
//       if (!isSupported) return;

//       // Create event listener that calls handler function stored in ref
//       const eventListener = event => savedHandler.current(event)

//       // Add event listener
//       element.addEventListener(eventName, eventListener);

//       // Remove event listener on cleanup
//       return () => {
//         element.removeEventListener(eventName, eventListener);
//       };
//     },
//     [eventName, element] // Re-run if eventName or element changes
//   );
// };



// VERSION TWO ----------------------------------------------------------------------------------------------------------
// // https://github.com/n8tb1t/use-scroll-position
// import { useRef, useLayoutEffect, useEffect } from 'react'

// const isBrowser = typeof window !== 'undefined'
// const useIsomorphicLayoutEffect = (isBrowser) ? useLayoutEffect : useEffect


// function getScrollPosition({ element, useWindow }) {
//   if (!isBrowser) return { x: 0, y: 0 }

//   const target = element ? element.current : document.body
//   const position = target.getBoundingClientRect()

//   return useWindow
//     ? { x: window.scrollX, y: window.scrollY }
//     : { x: position.left, y: position.top }
// }

// export default function useScrollPosition(effect, deps, element, useWindow, wait) {
//   console.log('effect:', effect, '  deps:', deps, '  element:', element, '  useWindow:', useWindow, '  wait:', wait);

//   const position = useRef(getScrollPosition({ useWindow }))

//   let throttleTimeout = null

//   const callBack = () => {
//     const currPos = getScrollPosition({ element, useWindow })
//     effect({ prevPos: position.current, currPos })
//     position.current = currPos
//     throttleTimeout = null
//   }

//   useIsomorphicLayoutEffect(() => {
//     if (!isBrowser) {
//       return
//     }

//     const handleScroll = () => {
//       if (wait) {
//         if (throttleTimeout === null) {
//           throttleTimeout = setTimeout(callBack, wait)
//         }
//       } else {
//         callBack()
//       }
//     }

//     window.addEventListener('scroll', handleScroll)

//     return () => window.removeEventListener('scroll', handleScroll)
//   }, deps)
// }

// useScrollPosition.defaultProps = {
//   deps: [],
//   element: false,
//   useWindow: false,
//   wait: null,
// }
