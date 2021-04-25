import { useState, useEffect } from 'react';

import './Flippy.scss';

function Flippy({ frontContent, backContent }) {
  const [flipped, setFlipped] = useState(false);
  const flippedClass = flipped ? 'flipped ' : '';

  useEffect(() => {
    const onKeyDown = ({ key }) => {
      if (key === 'f') {
        setFlipped(isFlipped => !isFlipped);
      }
    };

    console.log('keydown listener added');
    window.addEventListener('keydown', onKeyDown);

    return () => {
    console.log('keydown listener removed');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return (
    <div className={`Flippy-card ${flippedClass}`} onClick={() => setFlipped(isFlipped => !isFlipped)}>
      <div className="Flippy-card-inner">
        <div className="Flippy-card-front">{frontContent}</div>
        <div className="Flippy-card-back">{backContent}</div>
      </div>
    </div>
  );
}

export default Flippy;