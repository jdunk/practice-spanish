import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import './PronounImage.scss';

const PronounImage = (props) => {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
  }, [props.pronoun]);

  return (
    <Box className="PronounImage" position="relative">
      <Skeleton
        variant="rect"
        animation="pulse"
        width={'100%'}
        height={'100%'}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)',
          ...(imgLoaded && {visibility: 'hidden'})
        }}
      />
      <img
        src={props.pronoun.src} alt="pronoun"
        style={{
          display: 'block',
          boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)',
          ...(!imgLoaded && {visibility: 'hidden'})
        }}
        onLoad={()=> setImgLoaded(true)}
      />
    </Box>
  );
};

export default PronounImage;
