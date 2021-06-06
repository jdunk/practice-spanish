import { useEffect } from 'react';

export function useEventListener(eventName, handleEventFn) {
  useEffect(() => {
    // console.log(`${eventName} listener added`)
    window.addEventListener(eventName, handleEventFn);

    return () => {
      window.removeEventListener(eventName, handleEventFn);
    };
  }, [eventName, handleEventFn]);
};