import { useEffect, useReducer } from 'react';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import answerColor from '@material-ui/core/colors/green';
import Flippy from './Flippy.jsx';
import PronounImage from './PronounImage.jsx';
import getVerbs from '../core/verbs';
import getPronouns from '../core/pronouns';
import { conjugate } from '../core/grammar';
import getShuffledArrayIndices from '../util/shuffle';

const useStyles = makeStyles(theme => ({
  answerBoxes: {
    '& > *': {
      backgroundColor: answerColor['A100'],
    }
  }
}));

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

const initialState = {
  currVerb: getRandomVerb(),
  nextPronounIndices: getInitialPronounIndices(),
  pronounRevealed: false,
  conjugationRevealed: false,
};

function nextAction(state) {
  if (!state.pronounRevealed) {
    return {
      ...state,
      pronounRevealed: true,
    };
  }

  if (!state.conjugationRevealed) {
    return {
      ...state,
      conjugationRevealed: true,
    };
  }

  return {
    ...state,
    pronounRevealed: false,
    conjugationRevealed: false,
    currVerb: getRandomVerb(),
    nextPronounIndices: [...getNextPronounIndices()],
  }
}

const MainContent = () => {
  const [state, dispatchNextAction] = useReducer(nextAction, initialState);
  const {nextPronounIndices, currVerb, pronounRevealed, conjugationRevealed} = state;
  const currPronounIndex = nextPronounIndices[0];
  const currPronoun = pronouns[currPronounIndex];

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
        dispatchNextAction();
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
        dispatchNextAction();
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

  const classes = useStyles();

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

        <Box className={classes.answerBoxes} p={2} mt={1} display="flex" alignItems="center">
          <Box className="pronounAnswer" p={2} mr={1} border={1} clone>
            <Fade in={pronounRevealed} timeout={300}>
              <Paper elevation={1} style={{ ...(pronounRevealed || {display: 'none'}) }}>
                <Typography noWrap variant="h4">
                  { `${currPronoun.pronounName.charAt(0).toUpperCase()}${currPronoun.pronounName.slice(1)}` }
                </Typography>
              </Paper>
            </Fade>
          </Box>
          <Box className="conjugationAnswer" p={2} border={1} clone>
            <Fade in={conjugationRevealed} timeout={300}>
              <Paper elevation={1} style={{ ...(pronounRevealed || {display: 'none'}) }}>
                <Typography noWrap variant="h4">
                  { conjugate(currVerb, currPronoun) }
                </Typography>
              </Paper>
            </Fade>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MainContent;
