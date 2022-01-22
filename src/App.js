import { React } from 'react';
import {
  BrowserRouter as Router,
} from "react-router-dom"
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import Routes from './Routes';
import styles from './index.scss'

function App() {
  
  return (
    <>
      <CssBaseline />
      <Router>
          <div className={styles.root}>
            <Routes />
          </div>
      </Router>
    </>
  );
}

export default App;

