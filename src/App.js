import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import 'dayjs/locale/pt-br';
import './App.css';
import Rotas from './routes';

function App() {
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
        <Rotas />
      </LocalizationProvider>
    </div>
  );
}

export default App;
