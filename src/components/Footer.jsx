import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Hidden from '@material-ui/core/Hidden';
import bgColor from '@material-ui/core/colors/lightBlue';
import { makeStyles } from '@material-ui/core/styles';
import './Footer.scss';

const useStyles = makeStyles({
  root: {
    backgroundColor: bgColor[50],
  }
});

function Footer() {
  const classes = useStyles();

  return (
    <Box className={`Footer ${classes.root}`} px={1} boxShadow={4} mt={3}>
      App hand-coded by <Link href="https://jaredduncan.com/" target="_blank"><strong>Jared Duncan</strong></Link>
      <Hidden only="xs">
        {' using '}
        <Link href="https://reactjs.org/" target="_blank" rel="noreferrer">React</Link>
        {' and '}
        <Link href="https://material-ui.com/" target="_blank" rel="noreferrer">Material UI</Link>
      </Hidden>
    </Box>
  );
}

export default Footer;