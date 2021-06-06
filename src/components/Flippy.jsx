import { useState, useCallback } from 'react';
import { useEventListener } from '../hooks/eventListener';

import './Flippy.scss';

function Flippy({ frontContent, backContent }) {
  const [flipped, setFlipped] = useState(false);
  const flippedClass = flipped ? 'flipped ' : '';

  const toggleFlipped = e => {
      e.preventDefault();
      setFlipped(isFlipped => !isFlipped);
  };

  useEventListener('keydown', useCallback(e => {
    if (e.key === 'f') {
      toggleFlipped(e);
    }
  }, []));

  return (
    <div className={`Flippy-card ${flippedClass}`} onClick={toggleFlipped}>
      <div className="Flippy-card-inner">
        <div className="Flippy-card-front">{frontContent}</div>
        <div className="Flippy-card-back">{backContent}</div>
      </div>
    </div>
  );
}

export default Flippy;