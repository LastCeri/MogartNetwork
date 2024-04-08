import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals';
import { DataProvider } from './MogartBase/Context/DataContext';
import { VoiceCallProvider } from './MogartBase/Context/VoiceCallProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <DataProvider>
      <VoiceCallProvider> 
        <App />
      </VoiceCallProvider>
  </DataProvider>
</React.StrictMode>
);

reportWebVitals();
