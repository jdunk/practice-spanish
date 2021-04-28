import Box from '@material-ui/core/Box';
import './PronounImage.scss';

const PronounImage = (props) => {
  return (
    <Box className="PronounImage">
      <img src={props.pronoun.src} alt="" style={{ display: 'block', boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.2)' }} />
    </Box>
  );
};

export default PronounImage;
