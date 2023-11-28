import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import './App.css';

import Routes from './routes';

function App() {
  return (
    <div>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
        <Routes />
      </LocalizationProvider>
    </div>
  );
}

export default App;
