import Box from '@material-ui/core/Box';
import AppBar from './AppBar.jsx';
import MainContent from './MainContent.jsx';
import Footer from './Footer.jsx';

import './Layout.scss';

function Layout() {
  return (
    <>
      <AppBar />

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