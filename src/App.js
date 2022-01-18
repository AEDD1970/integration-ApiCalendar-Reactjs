import { React } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom"
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Routes from './Routes';
// import NavBar from './Components/NavBar/index';


function App() {
  
  return (
    <ThemeProvider >
      <CssBaseline />
      <Router>
          {/* <NavBar /> */}
          <div className={styles.root}>
            <Routes />
          </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

