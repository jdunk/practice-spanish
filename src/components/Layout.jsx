import Header from './Header.jsx';
import MainContent from './MainContent.jsx';
import Footer from './Footer.jsx';

import './Layout.scss';

function Layout() {
  return (
    <div className="Layout">
      <Header></Header>
      <MainContent></MainContent>
      <Footer></Footer>
    </div>
  );
}

export default Layout;