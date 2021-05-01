import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Flippy from './Flippy.jsx';
import PronounImage from './PronounImage.jsx';
import getVerbs from '../core/verbs';
import getPronouns from '../core/pronouns';
import { conjugate } from '../core/grammar';
import getShuffledArrayIndices from '../util/shuffle';

const pronouns = getPronouns();

const getShuffledPronounIndices = () => getShuffledArrayIndices(pronouns.length);
let shuffledPronounIndices = getShuffledPronounIndices();

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

let verbs = getVerbs();

function getRandomVerb() {
  return getRandomArrayItem(verbs);
}

const MainContent = () => {
  const [nextPronounIndices, setNextPronounIndices] = useState(getInitialPronounIndices());
  const currPronounIndex = nextPronounIndices[0];
  const [currVerb, setVerb] = useState(getRandomVerb());
  const currPronoun = pronouns[currPronounIndex];

  const nextTestItem = () => {
    setVerb(getRandomVerb());
    setNextPronounIndices([...getNextPronounIndices()]);
  };

  useEffect(() => {
    nextPronounIndices.forEach(i => {
      const img = new Image();
      img.src = pronouns[i];
      img.onload = () => {
        // console.log(`preloaded ${img.src}`);
      };
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
            frontContent={currVerb.infinitive}
            backContent={`to ${currVerb.english}`}
          >
          </Flippy>
        </Box>
      
        <PronounImage pronoun={currPronoun} />
      </Box>
    </>
  );
};

export default MainContent;
