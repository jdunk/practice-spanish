import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import MainContent from './MainContent.jsx';
import Footer from './Footer.jsx';
import logo from '../assets/img/logo.png';

import './Layout.scss';

function Layout() {
  const theme = useTheme();

  const mdAndUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <AppBar>
        <Toolbar {...(mdAndUp && {variant: 'dense'})}>
          <Box display="block" mr={2} clone>
            <img src={logo} width={40} height={40} />
          </Box>
          <h3 style={{ fontFamily: 'cursive' }}>Practice Spanish!</h3>
        </Toolbar>
      </AppBar>

      <Box className="Layout" display="flex" flexDirection="column">
        <Box flexGrow={1} mt={{ xs: 7, md: 5, lg: 6 }}>
          <MainContent></MainContent>
        </Box>
        <Footer></Footer>
      </Box>
    </>
  );
}

export default Layout;