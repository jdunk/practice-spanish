import { useEffect } from 'react';

export function useEventListener(eventName, handleEventFn, useCapture = false) {
  useEffect(() => {
    window.addEventListener(eventName, handleEventFn, useCapture);

    return () => {
      window.removeEventListener(eventName, handleEventFn, useCapture);
    };
  }, [eventName, handleEventFn, useCapture]);
};

/**
 * Listens for "touchstart" and "touchend" events and calls
 * registered "swipe" handlers based on the direction of the
 * swipe.
 *
 * @param {obj} handlers
 * Format: {
 *   [direction]: <handlerFn>,
 *   ...
 * }
 *
 * Supported directions: [
 *   'up',
 *   'down',
 *   'right',
 *   'left',
 *   'upLeft',
 *   'upRight',
 *   'downLeft',
 *   'downRight'
 * ]
 */
export function useSwipeListener(handlers) {
  useEffect(() => {
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const handleTouchStart = (event) => {
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    };

    const handleTouchEnd = (event) => {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      handleGesture();
    };

    window.addEventListener('touchstart', handleTouchStart, false);

    window.addEventListener('touchend', handleTouchEnd, false);

    function handleGesture() {
      const swiped = {
        up: touchendY + 10 < touchstartY,
        down: touchendY > touchstartY + 10,
        left: touchendX + 10 < touchstartX,
        right: touchendX > touchstartX + 10,
      };
      const handlersToCall = {
        ...swiped,
        upLeft: swiped.up && swiped.left,
        upRight: swiped.up && swiped.right,
        downLeft: swiped.down && swiped.left,
        downRight: swiped.down && swiped.right,
      };

      for (const swipeType in handlersToCall) {
        if (!handlersToCall[swipeType] || !(swipeType in handlers)) {
          continue;
        }

        handlers[swipeType]();
      }
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handlers]);

};