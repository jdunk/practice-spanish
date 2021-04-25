import { useState, useEffect } from 'react';
import Flippy from './Flippy.jsx';
import verbs from '../data/verbs';

import './MainContent.scss';

function importAll(r) {
  console.log({ rKeys: r.keys() })
  return r.keys().map((item) => (
    [
      item.replace('./', ''),
      r(item)
    ]
  ));
}

const images = importAll(require.context('../assets/img/pronouns', false, /\.(png|jpe?g|svg|jfif)$/));
const pronounImages = images.map(([filename, module]) => <img src={module.default} alt="" style={{ boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)' }} />);

console.log({
  entries: Object.entries(images),
  mapped: images.map(foo => ({ foo })),
});

function getRandomArrayItem(givenArray) {
  return givenArray[Math.floor(Math.random() * givenArray.length)];
}

function getRandomPronounImage() {
  return getRandomArrayItem(pronounImages);
}

function getRandomVerb() {
  const spanishVerb = getRandomArrayItem(Object.keys(verbs));
  return { spanish: spanishVerb, english: verbs[spanishVerb] };
}

const MainContent = () => {
  const [currVerb, updateVerb] = useState(getRandomVerb());
  const [currPronounImage, updatePronounImage] = useState(getRandomPronounImage());

  const nextTestItem = () => {
    updateVerb(getRandomVerb());
    updatePronounImage(getRandomPronounImage());
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        nextTestItem();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="MainContent">
      <div style={{margin: '50px'}}>
        <Flippy
          frontContent={currVerb.spanish}
          backContent={`to ${currVerb.english}`}
        >
        </Flippy>
      </div>
      
      {currPronounImage}
    </div>
  );
};

export default MainContent;
