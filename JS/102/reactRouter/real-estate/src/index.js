import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import  Home from './Home';
import Buy from './Buy';
import Sell from './Sell';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
  <BrowserRouter>
  <Routes>

    <Route path = "/" element = {<App/>}>
      <Route index element = {<Home/>}/>
      <Route path="/buy" element = {<Buy/>}/>
      <Route path = "/sell"  element = {<Sell/>}/>
    </Route>
 
 
    </Routes>
    </BrowserRouter>
  </>
);

reportWebVitals();
