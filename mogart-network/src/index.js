import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { DataProvider } from './MogartBase/Context/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <DataProvider>
    <App />
  </DataProvider>
</React.StrictMode>
);

reportWebVitals();
