// Declarative interval hook by Dan Abramov
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useEffect, useRef } from 'react'

export const useInterval = (callback, delay) => {
  const intervalRef = useRef(null)
  const callbackRef = useRef(callback)

  // Remember the latest callback
  // Without this, if you change the callback, when setInterval ticks again, it
  // will still call your old callback. If you add `callback` to useEffect's deps,
  // it will work fine but the interval will be reset.
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  // Set up the interval
  useEffect(() => {
    if (typeof delay === 'number') {
      intervalRef.current = setInterval(() => callbackRef.current(), delay)

      // Clear interval if the components is unmounted or the delay changes
      return () => window.clearInterval(intervalRef.current || 0)
    }
  }, [delay])

  // In case you want to manually clear the interval from the consuming component
  return intervalRef
}
