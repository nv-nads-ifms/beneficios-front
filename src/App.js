import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import 'dayjs/locale/pt-br';
import './App.css';
import Rotas from './routes';

function App() {
  return (
    <div>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
        <Rotas />
      </LocalizationProvider>
    </div>
  );
}

export default App;
