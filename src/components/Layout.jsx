import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import MainContent from './MainContent.jsx';
import Footer from './Footer.jsx';
import logo from '../assets/img/logo.png';

import './Layout.scss';

function Layout() {
  return (
    <>
      <AppBar>
        <Toolbar variant="dense">
          <Box display="block" mr={2} clone>
            <img src={logo} width={35} height={35} alt="logo" />
          </Box>
          <Typography noWrap variant="h6" component="h1" style={{ fontFamily: 'cursive' }}>Practice Spanish!</Typography>
        </Toolbar>
      </AppBar>

      <Box className="Layout" display="flex" flexDirection="column">
        <Box flexGrow={1} mt={{ xs: 6 }}>
          <MainContent></MainContent>
        </Box>
        <Footer></Footer>
      </Box>
    </>
  );
}

export default Layout;