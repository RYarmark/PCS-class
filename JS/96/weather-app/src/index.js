import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


//console.log('hello1');
const root = ReactDOM.createRoot(document.getElementById('root'));
//console.log('hello')
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


reportWebVitals();
