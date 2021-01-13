import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import axios from 'axios';
import dotenv from 'dotenv';
import './assets/scss/main.scss';
import Layout from './components/hoc/layout/Layout';
import Routes from './routes';

const REACT_APP_BACKEND_URL = 'https://authors-heaven-api.herokuapp.com/api/v1';
axios.defaults.baseURL = REACT_APP_BACKEND_URL;

dotenv.config();

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#e03997'
      },
      secondary: {
        main: '#00b5ad'
      },
      light: {
        main: '#fff'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Routes />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
