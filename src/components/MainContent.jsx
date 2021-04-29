import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Flippy from './Flippy.jsx';
import PronounImage from './PronounImage.jsx';
import verbs from '../data/verbs';
import getShuffledArrayIndices from '../util/shuffle';

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
const pronounImages = images.map(([filename, module]) => module.default);
const getShuffledPronounIndices = () => getShuffledArrayIndices(pronounImages.length);
let shuffledPronounIndices = getShuffledPronounIndices();

console.log({
  entries: Object.entries(images),
  mapped: images.map(foo => ({ foo })),
});

function getRandomArrayItem(givenArray) {
  return givenArray[Math.floor(Math.random() * givenArray.length)];
}

function getInitialPronounIndices() {
  // TODO: if shuffle mode
  return shuffledPronounIndices;
}

function getNextPronounIndices() {
  // TODO: if shuffle mode
  shuffledPronounIndices.shift();

  if (!shuffledPronounIndices.length)
    shuffledPronounIndices = getShuffledPronounIndices();

  return shuffledPronounIndices;
}
function getPronounObj(src) {
  return { src };
}

function getRandomVerb() {
  const spanishVerb = getRandomArrayItem(Object.keys(verbs));
  return { spanish: spanishVerb, english: verbs[spanishVerb] };
}

const MainContent = () => {
  const [nextPronounIndices, updateNextPronounIndices] = useState(getInitialPronounIndices());
  const currPronounIndex = nextPronounIndices[0];
  const [currVerb, updateVerb] = useState(getRandomVerb());
  const currPronoun = pronounImages[currPronounIndex];

  const nextTestItem = () => {
    updateVerb(getRandomVerb());
    updateNextPronounIndices([...getNextPronounIndices()]);
  };

  useEffect(() => {
    nextPronounIndices.forEach(i => {
      const img = new Image();
      img.src = pronounImages[i];
    });
  }, []);

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
      if (touchendX + 10 < touchstartX) {
        // console.log('Swiped left');
        // console.log(touchendX - touchstartX)
        nextTestItem();
      }

      if (touchendX > touchstartX + 10) {
        // console.log('Swiped right');
        // console.log(touchendX - touchstartX)
      }

      if (touchendY + 10 < touchstartY) {
        // console.log('Swiped up');
        // console.log(touchendY - touchstartY)
      }

      if (touchendY > touchstartY + 10) {
        // console.log('Swiped down');
        // console.log(touchendY - touchstartY)
      }

      if (touchendY === touchstartY) {
        // console.log('Tap');
      }
    }

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <>
      <Box
        className="MainContent"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Box
          my={3}
        >
          <Flippy
            frontContent={currVerb.spanish}
            backContent={`to ${currVerb.english}`}
          >
          </Flippy>
        </Box>
      
        <PronounImage pronoun={getPronounObj(currPronoun)} />
      </Box>
    </>
  );
};

export default MainContent;
