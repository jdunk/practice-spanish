import '@fontsource/roboto';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './Layout.jsx';

import './App.scss';

const App = () => {
  return (
    <>
      <CssBaseline />
      <div className="App">
        <Layout />
      </div>
    </>
  );
};

export default App;
